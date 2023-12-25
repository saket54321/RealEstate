import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userrouter from "./routes/user.route.js";
const app=express();
dotenv.config();
app.use('/api/user',userrouter);
mongoose.connect(process.env.MONGODB).then(()=>{
    app.listen(5000,()=>{
        console.log("app is listenning on port 5000/");
    })
}).catch((err)=>{
    console.log("error in connecting to database");
})
