'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';


const CreateArea = () => {
  const [formData, setFormData] = useState({
    city: '',
    district: '',
    state: '',
    pincode: '',
  });



  const handleChange = (e) => {
    const { city, value } = e.target;
    setFormData({ ...formData, [city]: value });
  };
  
  const router = useRouter();//just before the handleSubmit where the agent created response is stored
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to create the agent using Axios
    axios.post('http://localhost:3001/api/area/createarea', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        
      })
      .then((response) => {
        console.log('Area created:', response.data);
        toast.success('Area has been created');// You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also. 
      
        router.push( "/area");//this is the code to redirect to agents page. SET ALWAYS IN RESPONSE. Set a timeout to redirect as well. import this before handlesubmit const router = useRouter(); and this import { useRouter } from 'next/navigation';

      })
      .catch((error) => {
        console.error('Error creating Area:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <form className='absolute right-20 top-20 shadow-2xl bg-sky-200' onSubmit={handleSubmit}>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>District:</label>
        <input
          type="text"
          name="District"
          value={formData.district}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Pincode:</label>
        <input
          type="integer"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </div>
      <button className='bg-sky-700' type="submit" >Create Area</button>
    </form>
  );
};

export default CreateArea;
