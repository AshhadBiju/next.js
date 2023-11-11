"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateCustomerForm({
    id,
    name,
    mobileNumber,
    registerNumber,
    address,
    userID,
    areaID,
    planID,
}) {
  const [newName, setnewName] = useState(name);
  const [newMobileNumber, setnewMobileNumber] = useState(mobileNumber);
  const [newRegisterNumber, setnewRegisterNumber] = useState(registerNumber);
  const [newAddress, setnewAddress] = useState(address);
 
  const router = useRouter(); //just before the handleSubmit where the area updated response is stored

  // const handleChange = (e) => {
  //  const { city, value } = e.target;
  // setFormData({ ...formData, [city]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      toast.error('Please log in first');
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log(`id=${id}, ${newName}`);
    try {
      const res = axios
        .put(
          `http://localhost:3001/api/customer/update/${id}`,
          {
            name:newName,
            mobileNumber:newMobileNumber,
            registerNumber:newRegisterNumber,
            address:newAddress,
            userID,
            areaID,
            planID,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        )
        .then((result) => {
          console.log(`responEditresult=${result.status}`);
          toast.success('Customer updated');
          setTimeout(() => {
              router.push('/customer');
            }, 3000); // 3000 milliseconds = 3 seconds
        })
        .catch((error) => {
          console.log(`responEditerror=${error}`);
        });
      console.log(`responEdit=${res.status}`);
      // if (!res.status.ok) {
      //   console.log("customer NOT updated:", res.data);
      //   toast.failed("Agent has been updated"); // You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.
      // }
    } catch (error) {
      console.error("Error updating customer:", error);
      // Handle the error and display an error message if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]">
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          onChange={(e) => setnewName(e.target.value)}
          value={newName}
          type="text"
          placeholder="Name"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div >
      <div className="mb-4">
        <label className="block text-gray-700">Mobile Number:</label>
        <input
          onChange={(e) => setnewMobileNumber(e.target.value)}
          value={newMobileNumber}
          type="text"
          placeholder="Mobile Number"
          required
          pattern="[0-10]*"  // Only allow numbers
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Register Number:</label>
        <input
          onChange={(e) => setnewRegisterNumber(e.target.value)}
          value={newRegisterNumber}
          type="text"
          placeholder="Register Number"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          onChange={(e) => setnewAddress(e.target.value)}
          value={newAddress}
          type="text"
          placeholder="Address"
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Plan ID:</label>
        <input
           defaultValue={planID}
          type="text"
          disabled
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
        <label className="block text-gray-700">Area ID:</label>
        <input
          defaultValue={areaID} 
          type="text"
          disabled
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" type="submit">Update Customer</button>
      <ToastContainer /> 
    </form>
  );
}
