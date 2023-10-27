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
}) {
  const [newDistrict, setnewDistrict] = useState(district);
  const [newCity, setnewCity] = useState(city);
  const [newState, setnewState] = useState(state);
  const [newPincode, setnewPincode] = useState(pincode);
 
  const [newID, setId] = useState(id);
  
  
  const router = useRouter(); //just before the handleSubmit where the area updated response is stored

  // const handleChange = (e) => {
  //  const { city, value } = e.target;
  // setFormData({ ...formData, [city]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to Update the area using Axios
    console.log(`id=${id}, ${newCity}`);
    try {
      const res = axios
        .put(
          `http://localhost:3001/api/area/${id}`,
          {
            city: newCity,
            state: newState,
            district: newDistrict,
            pincode: newPincode,
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
      //   console.log("area NOT updated:", res.data);
      //   toast.failed("Agent has been updated"); // You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.
      // }
      router.push("/area"); //this is the code to redirect to agents page. SET ALWAYS IN RESPONSE. Set a timeout to redirect as well. import this before handlesubmit const router = useRouter(); and this import { useRouter } from 'next/navigation';
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
      <button className="bg-sky-700" type="submit">
        Update Area
      </button>
    </form>
  );
}
