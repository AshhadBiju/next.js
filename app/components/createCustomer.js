'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    registerNumber: "",
    address: "",
    userID:"",
    areaID:"",
    planID:"",
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
    axios.post('http://localhost:3001/api/customer/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Authorization': `Bearer ${token}`
        },
        
      })
      .then((response) => {
        console.log('customer created:', response.data);
        toast.success('customer has been created');// You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.       
        setTimeout(() => {
          router.push('/customer');
        }, 3000);

      })
      .catch((error) => {
        console.error('Error creating Customer:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <form className='right-20 text-[#181818]  shadow-2xl bg-sky-200' onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Register Number:</label>
        <input
          type="text"
          name="registerNumber"
          value={formData.registerNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Area ID:</label>
        <input
          type="text"
          name="areaID"
          value={formData.areaID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Plan ID:</label>
        <input
          type="text"
          name="planID"
          value={formData.planID}
          onChange={handleChange}
          required
        />
      </div>
      <button className='bg-sky-700' type="submit" >Create Customer</button>
      <ToastContainer/>
    </form>
  );
};

export default CreateCustomerForm;
