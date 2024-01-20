import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../Components/Oauth.jsx';
import { useCookies } from "react-cookie";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/UserSlice.js';

function Signin() {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const [cookies] = useCookies([]);
  const [formdata,setformdata]=useState({});
  // const [loading,setLoading]=useState(false);
  // const [error,setError]=useState();
  const {loading,error}=useSelector((state)=>state.user);
  const handlechange=(e)=>{
    setformdata({...formdata,[e.target.id]:e.target.value})
    //console.log(formdata);

  }
  // function getCookie(cookieName) {
  //   const name = cookieName + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   console.log(decodedCookie);
  //   const cookieArray = decodedCookie.split(';');
  
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     let cookie = cookieArray[i].trim();
  //     if (cookie.indexOf(name) === 0) {
  //       return cookie.substring(name.length, cookie.length);
  //     }
  //   }
  
  //   return null; // Return null if the cookie is not found
  // }
  
  useEffect(() => {
    //console.log(cookies);
    if (cookies.access_token) {
      //console.log("suman")
      navigate("/");
    }
  }, [navigate]);
  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      
      const data=await axios.post('http://localhost:5000/api/user/signin',formdata,{ withCredentials: true });
      //console.log("saket");
      //console.log(data);
      if (data.data.success === false) {
        //setLoading(false);
        dispatch(signInFailure(data.data.message));
        return;
      }
      dispatch(signInSuccess(data.data));
      //setLoading(false);
      //setError(null);
      navigate('/profile');
    } catch (error) {
      //console.log("saket");
      //setLoading(false);
      //setError(error.message);
      //console.log(error);
      dispatch(signInFailure(error.message));
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
      
      <input
        type='email'
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handlechange}
       
      />
      <input
        type='password'
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
        onChange={handlechange}
       
      />

      <button
      disabled={loading}
        
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...' : 'Sign IN'}
      </button>
      <Oauth/>
      
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have not an account?</p>
      <Link to={'/signup'}>
        <span className='text-blue-700'>Sign Up</span>
      </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    
  </div>
  )
}

export default Signin