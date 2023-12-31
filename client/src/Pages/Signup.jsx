import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
  const navigate=useNavigate();
  const [formdata,setformdata]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState();
  const handlechange=(e)=>{
    setformdata({...formdata,[e.target.id]:e.target.value})
    //console.log(formdata);

  }
  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      
      const data=await axios.post('http://localhost:5000/api/user/signup',formdata);
      //console.log("saket");
      //console.log(data.data.success);
      if (data.data.success === false) {
        setLoading(false);
        setError(data.data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      //console.log("saket");
      setLoading(false);
      //setError(error.message);
      console.log(error);
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='username'
        className='border p-3 rounded-lg'
        id='username'
        onChange={handlechange}
        
      />
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
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
      
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={'/signin'}>
        <span className='text-blue-700'>Sign in</span>
      </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    
  </div>
  )
}

export default Signup