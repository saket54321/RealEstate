import Listing from "../models/listing.model.js";
export const createlist=async(req,res,next)=>{
 // console.log(req.body);
    try{
      const list=new Listing(req.body);
      //console.log(list);
      await list.save();
      //console.log(list);
      
      res.status(200).json(list);


    }
    catch(error){
        next(error)
    }

}
export const photo=async(req,res)=>{
  //console.log(req.user);
    try {
      const updatedUser = await Listing.findOneAndUpdate(
        {userRef:req.user._id},
        {
          $push: {
            imageUrls: {
                $each: [`http://localhost:5000/${req.file.filename}`]
            }
        }
        },
        { new: true }
        
      );
      //console.log(updatedUser);
      if(!updatedUser){
       return res.json({ success: true, message: 'File not uploaded successfully', user: updatedUser });

      }
  
     return res.json({ success: true, message: 'File uploaded successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  export const getphoto=async(req,res,next)=>{
    try{
    const list=await Listing.find({userRef:req.user._id});
    //console.log(list);
    if(list){
      res.json({list:list});
    }
    }
    catch(error){
      next(error);
    }
  }
  export const updatephoto=async(req,res,next)=>{
    //console.log(req.user);
    try{
      const list=await Listing.findOneAndUpdate(
        {userRef:req.user._id},
        { $pull: { imageUrls:req.body.imageurl } },
        { new: true }
      )
      //console.log(list);
      res.json({message:"user delete successfully"});


    }
    catch(error){

    }

  }
