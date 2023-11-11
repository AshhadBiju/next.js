"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function UpdatePlan({
  id,
  planName,
  price,
  userID,
  imageURL,
}) {

  const [newPlanName, setnewPlanName] = useState(planName);
  const [newPrice, setnewPrice] = useState(price);
  const [newImageURL, setnewImageURL] = useState(imageURL);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    console.log(handleImageUpload);
    setFormData({ ...formData, imageURL: file });
  };

  const router = useRouter(); //just before the handleSubmit where the agent updated response is stored

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to Update the agent using Axios
    console.log(`id=${id}, ${newPlanName}`);
    try {
    const token = localStorage.getItem('token');

    if (!token) {
        // Handle the case when the token is not available (user is not logged in)
        console.error('Token not found. User is not logged in.');
        return;
    }
      const res = axios
        .put( 
            `http://localhost:3001/api/plans/update/${id}`,
          {
            planName:newPlanName,
            price:newPrice,
            imageURL:newImageURL,
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
          toast.success('Plan updated');
          setTimeout(() => {
              router.push('/plans');
            }, 3000); // 3000 milliseconds = 3 seconds
        })
        .catch((error) => {
          console.log(`responEditerror=${error}`);
        });
      console.log(`responEdit=${res.status}`);
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div className="mb-4">
        <label className="block text-gray-700">Plan Name:</label>
        <input
          onChange={(e) => setnewPlanName(e.target.value)}
          value={newPlanName}
          type="text"
          placeholder="Plan Name"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price:</label>
        <input
          onChange={(e) => setnewPrice(e.target.value)}
          value={newPrice}
          type="text"
          placeholder="Price"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User ID</label>
        <input
          defaultValue={userID}
          type="text"        
          disabled
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image:</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="image"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">
        Update Plan
      </button>
      <ToastContainer /> 
    </form>
  );
}
