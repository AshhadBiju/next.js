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
    <form className='absolute right-20 top-20 shadow-2xl bg-sky-200' onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <button className='bg-sky-700' type="submit">Create Agent</button>
      <ToastContainer /> 
      
    </form>
  );
};

export default CreateAgent;