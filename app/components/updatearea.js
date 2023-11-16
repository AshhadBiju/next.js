"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/utils/constants";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateArea({
  id,
  city,
  state,
  district,
  pincode,
  userID,
}) {
  const [newDistrict, setnewDistrict] = useState(district);
  const [newCity, setnewCity] = useState(city);
  const [newState, setnewState] = useState(state);
  const [newPincode, setnewPincode] = useState(pincode);
  
  const router = useRouter(); //just before the handleSubmit where the area updated response is stored

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      toast.error('Please log in first');
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log(`id=${id}, ${newCity}`);
    try {
      const res = axios
        .put(
          `${baseURL}area/update/${id}`,
          {
            city: newCity,
            state: newState,
            district: newDistrict,
            pincode: newPincode,
            userID,
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
          toast.success('Area has been updated');
          setTimeout(() => {
              router.push('/area');
            }, 3000); // 3000 milliseconds = 3 seconds
        })
        .catch((error) => {
          console.log(`responEditerror=${error}`);
        });
      console.log(`responEdit=${res.status}`);
    } catch (error) {
      console.error("Error updating area:", error);
      // Handle the error and display an error message if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div className="mb-4">
        <label className="block text-gray-700">City:</label>
        <input
          onChange={(e) => setnewCity(e.target.value)}
          value={newCity}
          type="text"
          placeholder="City"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">District:</label>
        <input
          onChange={(e) => setnewDistrict(e.target.value)}
          value={newDistrict}
          type="text"
          placeholder="District"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">State:</label>
        <input
          onChange={(e) => setnewState(e.target.value)}
          value={newState}
          type="text"
          placeholder="State"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User ID:</label>
        <input
          defaultValue={userID} // Display the current userID
          type="text"
          disabled
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Pincode:</label>
        <input
          onChange={(e) => setnewPincode(e.target.value)}
          value={newPincode}
          type="text"
          placeholder="Pincode"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">Update Area</button>
      <ToastContainer /> 
    </form>
  );
}
