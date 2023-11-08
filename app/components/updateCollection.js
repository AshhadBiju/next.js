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
    <form
      onSubmit={handleSubmit}
      className="absolute right-20 top-20 shadow-2xl bg-sky-200"
    >
      <div>
        <label>Date:</label>
        <input
          onChange={(e) => setnewDate(e.target.value)}
          value={newDate}
          type="text"
          placeholder="Date"  

        />
      </div>
      <div>
        <label>Description:</label>
        <input
          onChange={(e) => setnewDescription(e.target.value)}
          value={newDescription}
          type="text"
          placeholder="Description"
         
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          onChange={(e) => setnewAmount(e.target.value)}
          value={newAmount}
          type="text"
          placeholder="Amount"
          
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          defaultValue={userID} 
          type="text"
          disabled
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input
          defaultValue={customerID} 
          type="text"
          disabled
        />
      </div>
      <button className="bg-sky-700" type="submit">Update Collection</button>
      <ToastContainer /> 
    </form>
  );
}
