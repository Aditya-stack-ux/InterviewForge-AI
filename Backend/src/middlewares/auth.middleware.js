const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const userModel = require("../models/user.model")

async function authUser(req,res,next){
    const token = req.cookies?.token ||
                  req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({token})
        if(isBlacklisted){
            return res.status(401).json({
                message:"Unauthorized: Token invalid"
            })
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User not found"
            })
        }

        req.user = user
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        })
    }
}

module.exports = {authUser}