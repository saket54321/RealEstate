import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userrouter from "./routes/user.route.js";
import cors from "cors";
import cookieparser from "cookie-parser";
import listrouter from "./routes/listing.route.js";
const app=express();
dotenv.config();
app.use(cors({
    origin:["http://localhost:5173"],
    method:["GET","POST","PUT","DELETE"],
    credentials:true
}))
mongoose.connect(process.env.MONGODB).then(()=>{
    app.listen(5000,()=>{
        console.log("app is listenning on port 5000/");
    })
}).catch((err)=>{
    console.log("error in connecting to database");
})
app.use(express.json());
app.use(cookieparser());
app.use('/api/user',userrouter);
app.use('/api/list',listrouter);
app.use((err, req, res, next) => {
   // res.json({message:"something went wrong"})
    
    // const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    // //console.log(err.message);
    
      res.status(200).json({
       success: false,
      
      message,
    });
});
  



