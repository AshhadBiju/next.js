'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCollection = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    customerID: "",
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
    axios.post('http://localhost:3001/api/collection/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Authorization': `Bearer ${token}`
        },
        
      })
      .then((response) => {
        console.log('Collection created:', response.data);
        toast.success('Collection has been created');// You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.       
        setTimeout(() => {
          router.push('/collection');
        }, 3000);

      })
      .catch((error) => {
        console.error('Error creating Collection:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <form className='right-20 text-[#181818]  shadow-2xl bg-sky-200' onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          name="customerID"
          value={formData.customerID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>User ID</label>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          required
        />
      </div>
      <button className='bg-sky-700' type="submit" >Create Collection</button>
      <ToastContainer/>
    </form>
  );
};

export default CreateCollection;
