const express=require("express")
const connection = require("./connection/db")
const router = require("./routes/jobRoute")
const cors = require("cors")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to Dashboard")
})

app.use("/api",router)
app.listen(process.env.port,async(req,res)=>{
    try{
       await connection
       console.log("server in connected to db.");
    }catch(er){
        console.log(er)
    }
    console.log(`server in running ${process.env.port}`)
})