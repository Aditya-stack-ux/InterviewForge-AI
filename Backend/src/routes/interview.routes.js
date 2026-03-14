const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = Router()

interviewRouter.post("/", authMiddleware.authUser,upload.single("resume"), interviewController.generateInterviewReportController)

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

interviewRouter.get("/",authMiddleware.authUser, interviewController.getAllInterviewReportController)

interviewRouter.get("/resume/pdf/:interviewReportId",authMiddleware.authUser, interviewController.getResumePdfController)
module.exports = interviewRouter