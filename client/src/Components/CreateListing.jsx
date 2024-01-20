import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef:'',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imag,setIamg]=useState([]);
  const [file, setFile] = useState([]);
  
  //console.log(formData);
 //console.log(files);
//  useEffect(() => {
//   const getimage = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/list/getphoto', { withCredentials: true });
//       const imageUrls = response.data.list[0].imageUrls;
//       //console.log(response.data.list[0].imageUrls);
//      // console.log(imageUrls)

//       // Use the functional update form to access the previous state
//       setIamg(imageUrls);
//       // const a=["cat"];
//       // setIamg(a);

//       // Use a callback in the useEffect to log the updated state
//       //console.log(imag);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Call the getimage function inside the useEffect
//   getimage();
//   //console.log(imag);
// }, [imag]); 
 const handleRemoveImage=async(index)=>{
  try{
    const response=await axios.put('http://localhost:5000/api/list/updatephoto',{imageurl:index}, { withCredentials: true });

  }
  catch(error){
    console.log(error);
  }
  
   

 }
//  const upload=async()=>{
//   const formDatas = new FormData();
//   //const formDatas = new FormData();
//   //console.log(files);
//   formDatas.append('image', files);
//   //console.log(formDatas);
  
//   //console.log(formData);
//   const data=await axios.post('http://localhost:5000/api/list/photo', formDatas,{ withCredentials: true,});
//   console.log(data.data.user);

//  }
//  const handleFileChange = (e) => {
//   // Get the FileList from the input event
//   const selectedFiles = e.target.files;
//   //console.log(selectedFiles);

//   // Convert FileList to an array and set it in the state
//   const filesArray = Array.from(selectedFiles);
//   setFiles(filesArray);

//   // You can now use the filesArray as needed
//   console.log('Selected files:', files);
// };

 const handlesubmit=async(e)=>{
  e.preventDefault();
  //console.log("hi");

  try{
    if (file.length < 1)
    return setError('You must upload at least one image');
    if (+formData.regularPrice < +formData.discountPrice)
    return setError('Discount price must be lower than regular price');
   
    const formDatas = new FormData();
    
    for (let i = 0; i < file.length; i++) {
      //this is very important where it take lot of time
      formDatas.append('image', file[i]);
    }
    //console.log(newArr)
    
    //console.log(formDatas);
    //const formDatas = new FormData();
    
    //console.log(arr);
    // console.log(typeof(file));
    // file.forEach((file, index) => {
    //   //console.log(file);
    //   formDatas.append(`image${index + 1}`, file);
    // });
    //console.log(formDatas);
    formDatas.append('list',JSON.stringify({...formData,userRef:currentUser._id}))
    
    //console.log(formData);
    const res=await axios.post('http://localhost:5000/api/list/photo', formDatas,{ withCredentials: true,});
    //console.log(data);
    const data =  res.data;
    
    if (data.success === false) {
      setError(data.message);
    }
    navigate(`/listing/${data._id}`);

      
      // const data=await axios.post('http://localhost:5000/api/list/createlist',{...formData,userRef:currentUser._id},{ withCredentials: true})
      // console.log(data);
  }

  catch(error){
    setError(error.message);
      setLoading(false);

  }
 }
//const submit=()
  
 

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
      //console.log(formData);
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    //console.log(formData);
  };
  const fr=(e)=>{
    console.log(typeof(file));
    setFile(e.target.files);
  }

  
    
     
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form onSubmit={handlesubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={fr}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            
          </div>
          <p className='text-red-700 text-sm'>
            
          </p>
          

{imag.length > 0 &&
  imag.map((url, index) => 
    
    
     (
      <div key={url}>
        <img
          src={url}
          alt='listing image'
          className='w-20 h-20 object-contain rounded-lg'
        />
        <button
          type='button'
          onClick={() => handleRemoveImage(url)}
          className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
        >
          Delete
        </button>
      </div>
    )
  )}
          
                 
             
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}