'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
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
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log("Form submitted"); // Add this line
    // Send a POST request to your API to create the agent using Axios
    axios.post('http://localhost:3001/api/area/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Authorization': `Bearer ${token}`
        },
        
      })
      .then((response) => {
        console.log('Area created:', response.data);
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
    <form className='right-20 text-[#181818]  shadow-2xl bg-sky-200' onSubmit={handleSubmit}>
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
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>User ID</label>
        <input
          type="text"
          name="userID"
          defaultValue={formData.userID}
          onChange={handleChange}
          required
        />
      </div>
      <button className='bg-sky-700' type="submit" >Create Area</button>
      <ToastContainer/>
    </form>
  );
};

export default CreateArea;
