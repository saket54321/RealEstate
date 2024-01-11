import multer from "multer"
const storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
      //console.log(file);
      cb(null, 'server/upload/images'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      //console.log(file);
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
  });
 // console.log(storage.getFilename);
  
  const upload = multer({ storage: storage });
  export default upload