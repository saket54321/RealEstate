import express from "express"
import { signup ,signin,google,updateuser,deleteuser,signOut} from "../controller/user.controller.js";
import checkUser from "../utils/verifytoken.js"
const userrouter=express.Router();
userrouter.post('/signup',signup);
userrouter.post('/signin',signin);
userrouter.post('/google',google);
userrouter.put('/updateuser/:id',checkUser,updateuser);
userrouter.delete('/deleteuser/:id',checkUser,deleteuser);
userrouter.get('/signout',signOut);



export default userrouter;
