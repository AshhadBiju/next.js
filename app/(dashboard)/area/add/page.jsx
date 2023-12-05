"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
//import { toast, ToastContainer } from "react-toastify";

const CreateArea = () => {
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    userID: userID,
    city: "",
    state: "",
    district: "",
    pincode: "",
  });

  const [token, setToken] = useState("");

  const router = useRouter(); //just before the handleSubmit where the agent created response is stored

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);

    // Redirect to the login page if the user is not authenticated
    if (!tokenFromStorage) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(handleSubmit);
    console.log("Token:", token);
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      toast.error("Please Log in first");
      console.error("Token not found. User is not logged in.");
      return;
    }
    console.log("Form submitted"); // Add this line
    // Send a POST request to your API to create the agent using Axios
    axios
      .post(`${baseURL}area/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Area created:", response.data);
        console.log(response);
        toast.success("Area has been created"); // You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.
        setTimeout(() => {
          router.push("/area");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating Area:", error);
        toast.error("Error creating Area");
        // Handle the error and display an error message if needed
      });
  };

  return (
    <div className="pt-11">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white  rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            pattern="[0-4]*" // Only allow numbers
            title="Please enter only numeric values"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>

        <button
          className="w-full py-2  text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Create Area
        </button>
        <Toaster richColors />
      </form>
    </div>
  );
};

export default CreateArea;
