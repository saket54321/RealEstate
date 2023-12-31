import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebas';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/UserSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Oauth() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    
    
        const handleGoogleClick = async () => {
            //console.log("hi");
            try {
              const provider = new GoogleAuthProvider();
              const auth = getAuth(app);
        
              const result = await signInWithPopup(auth, provider);
              //console.log(result)
              const {displayName,email,photoURL}=result.user;
              const data=await axios.post('http://localhost:5000/api/user/google',{username:displayName,email:email,image:photoURL},{ withCredentials: true });
              //console.log(data.data);
        
              dispatch(signInSuccess(data.data));
              navigate('/');
               
             
            } catch (error) {
              console.log('could not sign in with google', error);
            }
          };

    
  return (
    <button
    onClick={handleGoogleClick}
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
  >
    Continue with google
  </button>
  )
}

export default Oauth