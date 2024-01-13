import express from "express"
import checkUser from "../utils/verifytoken.js";
import { photo,getphoto,updatephoto,getListing,deleteListing,updateListing,getList } from "../controller/listing.controller.js";
import  upload from "../utils/multer.js"

const listrouter=express.Router();
// listrouter.post('/createlist',checkUser,createlist);
listrouter.post('/photo',checkUser,upload.array('image',6),photo);
listrouter.get('/getphoto',checkUser,getphoto);
listrouter.put('/updatephoto/:id',checkUser,updatephoto);
listrouter.get('/get/:id',checkUser,getListing);
listrouter.get('/getlist/:id',checkUser,getList);

listrouter.delete('/delete/:id',checkUser,deleteListing);
listrouter.post('/update/:id',checkUser,upload.array('image',6),updateListing);







export default listrouter;