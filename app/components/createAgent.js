'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const router = useRouter(); //just before the handleSubmit where the agent created response is stored

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(handleSubmit);
    console.log('Token:', token);
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      console.error('Token not found. User is not logged in.');
      return;
  }
    axios.post('http://localhost:3001/api/users/createuser', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Authorization': `Bearer ${token}`
        },
        
      })
      .then((response) => {
        console.log('Agent created:', response.data);
        console.log(response);
        toast.success('Agent has been created');
        setTimeout(() => {
            router.push('/agents');
          }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.error('Error creating Agent:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <form  onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div className="mb-4">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">Create Agent</button>
      <ToastContainer /> 
    </form>
  );
};

export default CreateAgent;