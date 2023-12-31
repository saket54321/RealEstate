import express from "express"
import { signup ,signin,google} from "../controller/user.controller.js";
const userrouter=express.Router();
userrouter.post('/signup',signup);
userrouter.post('/signin',signin);
userrouter.post('/google',google);

export default userrouter;
