"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateCollectionForm({
      id,
      amount,
      description,
      date,
      customerID,
      userID,  
}) {
  const [newAmount, setnewAmount] = useState(amount);
  const [newDescription, setnewDescription] = useState(description);
  const [newDate, setnewDate] = useState(date);
 

  const router = useRouter(); //just before the handleSubmit where the area updated response is stored


  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log(`id=${id}, ${customerID}  ${userID}`);
   // try {
      const res = axios
        .put(
          `http://localhost:3001/api/collection/update/${id}`,
          {
            amount: newAmount,
            description: newDescription,
            date: newDate,
            customerID:customerID,
            userID:userID,  
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
          toast.success('Collection updated');
          setTimeout(() => {
              router.push('/collection');
            }, 3000); // 3000 milliseconds = 3 seconds
        })
        .catch((error) => {
          console.log(`responEditerror=${error} ${res}`);
        });
      console.log(`responEdit=${res.status}`);
    
    // } catch (error) {
    //   console.error("Error updating collection:", error);
  
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div className="mb-4">
        <label className="block text-gray-700">Date:</label>
        <input
          onChange={(e) => setnewDate(e.target.value)}
          value={newDate}
          type="text"
          placeholder="Date"  
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <input
          onChange={(e) => setnewDescription(e.target.value)}
          value={newDescription}
          type="text"
          placeholder="Description"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"        
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount:</label>
        <input
          onChange={(e) => setnewAmount(e.target.value)}
          value={newAmount}
          type="text"
          placeholder="Amount"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User ID:</label>
        <input
          defaultValue={userID} 
          type="text"
          disabled
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Customer ID:</label>
        <input
          defaultValue={customerID} 
          type="text"
          disabled
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">Update Collection</button>
      <ToastContainer /> 
    </form>
  );
}
