"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

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

  // const handleChange = (e) => {
  //  const { name, value } = e.target;
  // setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to Update the agent using Axios
    console.log(`id=${id}, ${newUserName}`);
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
            },
            // body: JSON.stringify({
            //   newUserName,
            //   newName,
            //   newEmail,
            //   newPassword,
            // }),
          }
        )
        .then((result) => {
          console.log(`responEditresult=${result.status}`);
        })
        .catch((error) => {
          console.log(`responEditerror=${error}`);
        });
      console.log(`responEdit=${res.status}`);
      // if (!res.status.ok) {
      //   console.log("Agent NOT updated:", res.data);
      //   toast.failed("Agent has been updated"); // You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.
      // }
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
    >
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
      <button className="bg-sky-700" type="submit">
        Update Agent
      </button>
    </form>
  );
}
