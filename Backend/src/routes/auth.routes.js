const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router();

/**
 * POST /api/auth/register
 */
authRouter.post("/register",authController.registerUserController)

/**
 * POST /api/auth/login
 */
authRouter.post("/login",authController.loginUserConrtoller)

/**
 * GET /api/auth.logout
 */
authRouter.get("/logout", authController.logoutUserController)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = authRouter