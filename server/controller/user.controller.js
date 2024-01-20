import User from "../models/user.model.js"
import errorHandler from "../utils/handleerror.js"
import jwt from "jsonwebtoken";
import upload from "../utils/multer.js"
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
        .cookie('access_token', token, { withCredentials: true,
          httpOnly: false }).json(rest);

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
        .cookie('access_token', token, { withCredentials: true,
          httpOnly: false}).json(rest);

            
        }
        else{
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRETKEY)
        //this is important line as destructing is not done by user instead used user._doc
        const {password,...rest}=user._doc;
        //console.log(rest);
        res
        .cookie('access_token', token, {withCredentials: true,
          httpOnly: false }).json(rest);
        }

        }
        catch(error){
            next(error);
        }


    }
    export const updateuser=async (req,res,next)=>{
      //console.log(req.body);
       //console.log(req.user._id);
       //console.log(req.body);
      //console.log(req.params.id);
      //console.log(req.user._id==req.params.id)
       if (req.user._id != req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));
      try {
        
    //console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              image: req.body.image,
            },
          },
          // new:true that is only mean for returning the updated value
          { new: true }
        );
    
        const { password, ...rest } = updatedUser._doc;
    
        res.status(200).json(rest);
      } catch (error) {
        next(error);
      }
    }

    export const deleteuser=async (req,res,next)=>{
      //console.log(req.user._id);
      //console.log(req.body);
     //console.log(req.params.id);
     //console.log(req.user._id==req.params.id)
      if (req.user._id != req.params.id)
       return next(errorHandler(401, 'You can only delete your own account!'));
     try {
       
   
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
     } catch (error) {
       next(error);
     }
   }
   export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };
  export const photo=async(req,res)=>{
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          image:`http://localhost:5000/${req.file.filename}`
        }
         
        },
        { new: true }
        
      );
  
      res.json({ success: true, message: 'File uploaded successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
  export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

