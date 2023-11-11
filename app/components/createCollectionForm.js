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
      toast.error('Please log in first');
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div>
        <label  className="block text-gray-700">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label  className="block text-gray-700">Amount:</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required  
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label  className="block text-gray-700">Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          pattern="[0-8]*"  // Only allow numbers
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Customer ID:</label>
        <input
          type="text"
          name="customerID"
          value={formData.customerID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">User ID</label>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">Create Collection</button>
      <ToastContainer/>
    </form>
  );
};

export default CreateCollection;
