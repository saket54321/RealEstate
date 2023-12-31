import User from "../models/user.model.js"
import {errorHandler} from "../utils/handleerror.js"
import jwt from "jsonwebtoken";
export const signup=async(req,res,next)=>{
    try{
        const data=req.body;
       
        const user=new User(data);
        
        await user.save();
        console.log(data);
        res.status(200).json(user);

    }
    catch(error){
        //res.json({error:"something went wrong"})
       //res.status(500).json({error:"something went wrong"});
       next(error);
        //console.log(error);
        //console.log(error);
        //res.json({err:"something went wrong"});

    }
}
    export const  signin=async(req,res,next)=>{
        const{email,password}=req.body;
        try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return next(errorHandler(400,"user not found"));
        }
        if(user.password!==req.body.password){
            //console.log(user);
            //const data= errorHandler(500,"wrong credentials");
            return next(errorHandler(401,"wrong cerdietial"))

        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRETKEY)
        //this is important line as destructing is not done by user instead used user._doc
        const {password,...rest}=user._doc;
        console.log(rest);
        res
        .cookie('access_token', token, { httpOnly: true }).json(rest);

        }
        catch(error){
            next(error);
        }
    }
    export const google=async(req,res,next)=>{
        const{username,email,image}=req.body;
        try{
        const user=await User.findOne({email});
        if(!user){
            let randomNumber = Math.floor(Math.random() * 100) + 1;
            const user=new User({username:username.split(' ').join('').toLowerCase(),email:email,password:randomNumber,image:image});
        
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRETKEY)
        //this is important line as destructing is not done by user instead used user._doc
        const {password,...rest}=user._doc;
        //console.log(rest);
        res
        .cookie('access_token', token, { httpOnly: true }).json(rest);

            
        }
        else{
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRETKEY)
        //this is important line as destructing is not done by user instead used user._doc
        const {password,...rest}=user._doc;
        //console.log(rest);
        res
        .cookie('access_token', token, { httpOnly: true }).json(rest);
        }

        }
        catch(error){
            next(error);
        }


    }

