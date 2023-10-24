'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';


const CreateAgent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phoneNumber: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const router = useRouter();//just before the handleSubmit where the agent created response is stored
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to create the agent using Axios
    axios.post('http://localhost:3001/api/users/createuser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        
      })
      .then((response) => {
        console.log('Agent created:', response.data);
        toast.success('Agent has been created');// You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also. 
      
        router.push( "/agents");//this is the code to redirect to agents page. SET ALWAYS IN RESPONSE. Set a timeout to redirect as well. import this before handlesubmit const router = useRouter(); and this import { useRouter } from 'next/navigation';

      })
      .catch((error) => {
        console.error('Error creating agent:', error);
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
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        required
        />
      </div>
      <button className='bg-sky-700' type="submit" >Create Agent</button>
    </form>
  );
};

export default CreateAgent;
