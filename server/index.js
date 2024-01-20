import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userrouter from "./routes/user.route.js";
import cors from "cors";
import cookieparser from "cookie-parser";
import listrouter from "./routes/listing.route.js";
import multer from "multer";
import checkUser from "./utils/verifytoken.js";
import User from "./models/user.model.js"
import path from 'path';
const __dirname = path.resolve();
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
app.use( express.static('server/upload/images'));
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


// const storage = multer.diskStorage({
  
//     destination: (req, file, cb) => {
//       //console.log(file);
//       cb(null, 'server/upload/images'); // Destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//       //console.log(file);
//       cb(null, Date.now() + '-' + file.originalname); // Unique filename
//     },
//   });
//  // console.log(storage.getFilename);
  
//   const upload = multer({ storage: storage });
  
//  // console.log(upload);
 
  
  
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
// app.post('/upload', checkUser, upload.single('image'), async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//       $set: {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         image:`http://localhost:5000/${req.file.filename}`
//       }
       
//       },
//       { new: true }
      
//     );

//     res.json({ success: true, message: 'File uploaded successfully', user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


