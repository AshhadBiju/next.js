"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
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
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log(`id=${id}, ${newCity}`);
    try {
      const res = axios
        .put(
          `http://localhost:3001/api/area/update/${id}`,
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
          toast.success('Area updated');
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
    <form
      onSubmit={handleSubmit}
      className="absolute right-20 top-20 shadow-2xl bg-sky-200"
    >
      <div>
        <label>City:</label>
        <input
          onChange={(e) => setnewCity(e.target.value)}
          value={newCity}
          type="text"
          placeholder="City"
          required
        />
      </div>
      <div>
        <label>District:</label>
        <input
          onChange={(e) => setnewDistrict(e.target.value)}
          value={newDistrict}
          type="text"
          placeholder="District"
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          onChange={(e) => setnewState(e.target.value)}
          value={newState}
          type="text"
          placeholder="State"
          required
        />
      </div>
      <div>
        <label>Pincode:</label>
        <input
          onChange={(e) => setnewPincode(e.target.value)}
          value={newPincode}
          type="text"
          placeholder="Pincode"
          required
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          defaultValue={userID} // Display the current userID
          type="text"
          disabled
        />
      </div>
      <button className="bg-sky-700" type="submit">Update Area</button>
      <ToastContainer /> 
    </form>
  );
}
