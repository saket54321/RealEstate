import Listing from "../models/listing.model.js";
import errorHandler from "../utils/handleerror.js"
export const photo=async(req,res,next)=>{
  // console.log(req.files);
  // const listString = req.body.list;
  //   const listObject = JSON.parse(listString);
  //   //console.log({...listObject,imageUrls:req.file.filename});
  //   try{
  //     //  const list=new Listing({...listObject,imageUrls:req.file.filename});
  //     // console.log(list);
  //     //  await list.save();
  //     // console.log(list);
      
  //     // res.status(200).json(list);


  //   }
  //   catch(error){
  //       next(error)
  //   }
  //console.log(req.files); // req.files should be an array if multiple files are uploaded
  const listString = req.body.list;
  const listObject = JSON.parse(listString);

  // Assuming that 'photos' is the field name in your form for file uploads
  const imageUrls = req.files.map(file => {
    // Handle file saving logic here
    // Example: save file to storage and return URL
    return `http://localhost:5000/${file.filename}`;
  });

  try {
    const list = new Listing({ ...listObject, imageUrls });
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }

}
// export const photo=async(req,res)=>{
//   //console.log(req.user);
//     try {
//       const updatedUser = await Listing.findOneAndUpdate(
//         {userRef:req.user._id},
//         {
//           $push: {
//             imageUrls: {
//                 $each: [`http://localhost:5000/${req.file.filename}`]
//             }
//         }
//         },
//         { new: true }
        
//       );
//       //console.log(updatedUser);
//       if(!updatedUser){
//        return res.json({ success: true, message: 'File not uploaded successfully', user: updatedUser });

//       }
  
//      return res.json({ success: true, message: 'File uploaded successfully', user: updatedUser });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   }

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
      const list=await Listing.findByIdAndUpdate(
        req.params.id,
        { $pull: { imageUrls:req.body.imageurl } },
        { new: true }
      )
      //console.log(list);
      res.json({message:"user delete successfully"});


    }
    catch(error){

    }

  }

  export const getListing = async (req, res, next) => {
    //console.log(req.params.id);
    try {
      const listing = await Listing.find({userRef:req.user._id});
      console.log(listing);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  export const updateListing = async (req, res, next) => {
   // console.log(req.params.id);
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const listString = req.body.list;
  const listObject = JSON.parse(listString);

  // Assuming that 'photos' is the field name in your form for file uploads
  const imag = req.files.map(file => {
    // Handle file saving logic here
    // Example: save file to storage and return URL
    return `http://localhost:5000/${file.filename}`;
  });
  const imageUrls=[...listing.imageUrls,...imag];
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        { ...listObject, imageUrls },
        { new: true }
      );
      //console.log(updateListing);
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };
  export const getList = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };
