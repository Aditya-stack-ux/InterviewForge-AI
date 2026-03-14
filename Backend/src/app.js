const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[
    "http://localhost:5173",
    "https://ai-interview-prep-fontend-n9yt.vercel.app"
  ],
    credentials:true
}))

/* require all the routes */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* use all the routes  */
app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app