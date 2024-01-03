import express from "express"
import checkUser from "../utils/verifytoken.js";
import { createlist } from "../controller/listing.controller.js";

const listrouter=express.Router();
listrouter.get('/createlist',checkUser,createlist);





export default listrouter;