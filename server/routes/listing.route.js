import express from "express"
import checkUser from "../utils/verifytoken.js";
import { createlist,photo,getphoto,updatephoto } from "../controller/listing.controller.js";
import  upload from "../utils/multer.js"

const listrouter=express.Router();
listrouter.post('/createlist',checkUser,createlist);
listrouter.post('/photo',checkUser,upload.single('image'),photo);
listrouter.get('/getphoto',checkUser,getphoto);
listrouter.put('/updatephoto',checkUser,updatephoto);







export default listrouter;