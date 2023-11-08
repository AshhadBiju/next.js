"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateAgent({
  id,
  name,
  password,
  username,
  email,
  phonenumber,
}) {

  
  const [newUserName, setnewUserName] = useState(username);
  const [newName, setnewName] = useState(name);
  const [newEmail, setnewEmail] = useState(email);
  const [newPassword, setnewPassword] = useState(password);
  const [newPhoneNumber, setnewPhoneNumber] = useState(phonenumber);
  const [newID, setId] = useState(id);
  
  const router = useRouter(); //just before the handleSubmit where the agent updated response is stored

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      console.error('Token not found. User is not logged in.');
      return;
  }
    try {
      const res = axios
        .put(
          `http://localhost:3001/api/users/updateuser/${id}`,
          {
            name: newName,
            password: newPassword,
            username: newUserName,
            email: newEmail,
            phonenumber: newPhoneNumber,
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
      router.push("/agents"); //this is the code to redirect to agents page. SET ALWAYS IN RESPONSE. Set a timeout to redirect as well. import this before handlesubmit const router = useRouter(); and this import { useRouter } from 'next/navigation';
    
    } catch (error) {
      console.error("Error updating agent:", error);
      // Handle the error and display an error message if needed
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute right-20 top-20 shadow-2xl bg-sky-200"
    ><ToastContainer />
       <div>
        <label>Username:</label>
        <input
          onChange={(e) => setnewUserName(e.target.value)}
          value={newUserName}
          type="text"
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          onChange={(e) => setnewName(e.target.value)}
          value={newName}
          type="text"
          placeholder="name"
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          onChange={(e) => setnewPassword(e.target.value)}
          value={newPassword}
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          onChange={(e) => setnewEmail(e.target.value)}
          value={newEmail}
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label>Phone-number:</label>
        <input
          onChange={(e) => setnewPhoneNumber(e.target.value)}
          value={newPhoneNumber}
          type="text"
          placeholder="Phone-number"
        />
      </div>
      <button className="bg-sky-700" type="submit">Update Agent</button>
      <ToastContainer /> 
    </form>
  );
}
