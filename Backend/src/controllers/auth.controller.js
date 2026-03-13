const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * Register user controller
 */
async function registerUserController(req,res){
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide username, email and password"
        })
    }

    const userAlreadyExist = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(userAlreadyExist){
        return res.status(400).json({
            message:"user already exist with this username or password"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {id:user._id, username:user.username},
         process.env.JWT_SECRET,
        {expiresIn: "1d"})

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })    

    res.status(201).json({
        message:"user registered succesfully",
        user:{
            id: user._id,
            username:user.username,
            email:user.email
        }
    })

}

/**
 * login user controller
 */
async function loginUserConrtoller(req,res){
    const {email, password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(
        {id:user._id, username:user.username},
         process.env.JWT_SECRET,
        {expiresIn: "1d"})
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({
        message:"User loggedIn successfully",
        user:{
            id: user._id,
            username:user.username,
            email:user.email
        }
    })    


}

async function logoutUserController(req,res){
    const token = req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"User Logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current loggedin user detail
 * @access private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"user detail fetched successfully",
        user:{
            user
        }
    })
}

module.exports = {registerUserController,
                  loginUserConrtoller,
                  logoutUserController,
                  getMeController
}