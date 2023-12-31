import mongoose from "mongoose"
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
       // unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    },
    image:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
    }
   
    
},{timestamps:true})
const User=mongoose.model('User',userschema);
export default User;