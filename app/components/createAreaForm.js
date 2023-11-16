'use client'
import React, { useState } from 'react';
import axios from 'axios'; 
import { baseURL } from "@/app/utils/constants";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateArea = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    district: "",
    pincode: "",
    userID:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const router = useRouter();//just before the handleSubmit where the agent created response is stored
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(handleSubmit);
    console.log('Token:', token);
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      toast.error('Please Log in first');
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log("Form submitted"); // Add this line
    // Send a POST request to your API to create the agent using Axios
    axios.post(`${baseURL}area/create`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Authorization': `Bearer ${token}`
        },
        
      })
      .then((response) => {
        console.log('Area created:', response.data);
        console.log(response);
        toast.success('Area has been created');// You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.       
        setTimeout(() => {
          router.push('/area');
        }, 3000);

      })
      .catch((error) => {
        console.error('Error creating Area:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div className='mb-4'>
        <label className='block text-gray-700'>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500'
        />
      </div>
      <div>
        <label className='block text-gray-700'>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label className='block text-gray-700'>District:</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label className='block text-gray-700'>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          pattern="[0-4]*"  // Only allow numbers
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label className='block text-gray-700'>User ID</label>
        <input
          type="text"
          name="userID"
          defaultValue={formData.userID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"       
        />
      </div>
      <button className="w-full py-2  text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit" >Create Area</button>
      <ToastContainer/>
    </form>
  );
};

export default CreateArea;
