const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {postRouter}=require("./routes/Post.routes")
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    await connection
    console.log("server is running at 4040")
})