import express from "express"
import { signup ,signin,google,updateuser,deleteuser,signOut,photo} from "../controller/user.controller.js";
import checkUser from "../utils/verifytoken.js"
import upload from "../utils/multer.js";
const userrouter=express.Router();
userrouter.post('/signup',signup);
userrouter.post('/signin',signin);
userrouter.post('/google',google);
userrouter.put('/updateuser/:id',checkUser,updateuser);
userrouter.delete('/deleteuser/:id',checkUser,deleteuser);
userrouter.get('/signout',signOut);
userrouter.post('/upload',checkUser,upload.single('image'),photo);



export default userrouter;
