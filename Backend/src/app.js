const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        const allowed = [
            "http://localhost:5173",
            "https://ai-interview-prep-fontend-n9yt.vercel.app"
        ]
        // Allow any vercel preview deployment of your app
        if (!origin || allowed.includes(origin) || /https:\/\/ai-interview-prep-fontend-n9yt.*\.vercel\.app/.test(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

/* require all the routes */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* use all the routes  */
app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app