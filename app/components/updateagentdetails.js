"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateAgent({
  id,
  name,
  password,
  username,
  email,
  phoneNumber,
}) {

  const [newUserName, setnewUserName] = useState(username);
  const [newName, setnewName] = useState(name);
  const [newEmail, setnewEmail] = useState(email);
  const [newPassword, setnewPassword] = useState(password);
  const [newPhoneNumber, setnewPhoneNumber] = useState(phoneNumber);
  //const [newID, setId] = useState(id);
  
  const router = useRouter(); //just before the handleSubmit where the agent updated response is stored

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(handleSubmit);
    console.log('Token:', token);
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      toast.error('Please log in first');
      console.error('Token not found. User is not logged in.');
      return;
  }
    try {
      const res = axios
        .put(
          `${baseURL}users/updateuser/${id}`,
          {
            name: newName,
            username: newUserName,
            email: newEmail,
            phoneNumber: newPhoneNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
          }
        )
        .then((result) => {
          console.log(`responEditresult=${result.status}`);
          toast.success(`Agent has been updated`);
          setTimeout(() => {
            router.push('/agents');
          }, 3000); // 3000 milliseconds = 3 seconds
        
        })
        .catch((error) => {
          console.log(`responEditerror=${error}`);
        });

      console.log(`responEdit=${res.status}`);
     // router.push("/agents"); //this is the code to redirect to agents page. SET ALWAYS IN RESPONSE. Set a timeout to redirect as well. import this before handlesubmit const router = useRouter(); and this import { useRouter } from 'next/navigation';
    
    } catch (error) {
      console.error("Error updating agent:", error);
      // Handle the error and display an error message if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
       <div className="mb-4">
        <label className="block text-gray-700">Username:</label>
        <input
          onChange={(e) => setnewUserName(e.target.value)}
          value={newUserName}
          type="text"
          placeholder="Username"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          onChange={(e) => setnewName(e.target.value)}
          value={newName}
          type="text"
          placeholder="name"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          onChange={(e) => setnewPassword(e.target.value)}
          value={newPassword}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Email:</label>
        <input
          onChange={(e) => setnewEmail(e.target.value)}
          value={newEmail}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone-number:</label>
        <input
          onChange={(e) => setnewPhoneNumber(e.target.value)}
          value={newPhoneNumber}
          type="text"
          placeholder="Phone-number"
          required
          pattern="[0-10]*"  // Only allow numbers
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">Update Agent</button>
      <ToastContainer /> 
    </form>
  );
}
