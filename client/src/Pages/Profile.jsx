import {useEffect, useRef,useState} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,Link} from "react-router-dom"

//import navigate
//import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/UserSlice.js';


function Profile() {
  const navigate=useNavigate();
  const[updateSuccess,setUpdateSuccess]=useState(false);
  const fileRef=useRef();
  const {currentUser,loading,error} =useSelector((state)=>state.user);
  //console.log(currentUser.image);
  const [file,setFile]=useState();
  const [formData,setFormData]=useState();
  const [selectedFile, setSelectedFile] = useState(null);
  //console.log(formData);
  const dispatch=useDispatch();
  // useEffect(()=>{
  //   console.log("useeffect");
  //   if(!currentUser){
  //     navigate('/signin');
  //   }
  // },[])
  const handleFileChange = (event) => {
    //console.log("hi");
    setSelectedFile(event.target.files[0]);
   // console.log(selectedFile)
    
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      dispatch(updateUserStart());
      //console.log(currentUser._id);
      const formDatas = new FormData();
      //console.log(selectedFile);
      formDatas.append('image', selectedFile);
      
      //console.log(formDatas);
      await axios.post('http://localhost:5000/api/user/upload', formDatas,{ withCredentials: true,
    })
      const data=await axios.put(`http://localhost:5000/api/user/updateuser/${currentUser._id}`,formData,{
        withCredentials: true,
      });
      console.log(data);
      if (data.data.success === false) {
        setUpdateSuccess(false);
        //console.log(updateSuccess);
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
      //console.log(currentUser._id);
      const data=await axios.delete(`http://localhost:5000/api/user/deleteuser/${currentUser._id}`,{
        withCredentials: true,
      });
      console.log(data);
      if (data.data.success === false) {
        
       
        dispatch(deleteUserFailure(data.message));
        return;
      }
      //navigate('/signin');

      dispatch(deleteUserSuccess(data));
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }

  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await axios.get('http://localhost:5000/api/user/signout');
      
      if (data.data.success === false) {
        dispatch(deleteUserFailure(data.data.message));
        return;
      }
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
           onChange={handleFileChange}
          
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.image}
          
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/createlisting'}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      
    </div>
  );
}

export default Profile