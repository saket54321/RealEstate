import jwt from "jsonwebtoken"
import User from '../models/user.model.js';
import errorHandler from "./handleerror.js";
const checkUser = (req, res, next) => {
  //console.log("hi");
  //console.log(req.cookies.jwt);
  //console.log(req.cookies);
    const token = req.cookies.access_token;
   // console.log(token);
    if (!token) return next(errorHandler(401, 'Unauthorized'));
    if (token) {
      //console.log("token");
      jwt.verify(
        token,
        process.env.JWT_SECRETKEY,
        async (err, decodedToken) => {
          //console.log(decodedToken);
          if (err) {
            //console.log("error decoded");
            return next(errorHandler(403, 'Forbidden'));
            
          } else {
           // console.log("token");
           //console.log(decodedToken);
            const user = await User.findById(decodedToken.id);
            //console.log(user);
            if (user) {
                req.user=user;
                next();
                
            }
            else  return next(errorHandler(403, 'user not found'));
            
          }
        }
      );
    } 
  };
  export default checkUser;