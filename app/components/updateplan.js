"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function UpdatePlan({ id, planName, price, userID, imageURL }) {
  const [newPlanName, setnewPlanName] = useState(planName);
  const [newPrice, setnewPrice] = useState(price);
  //const [newImageURL, setnewImageURL] = useState(imageURL);
  const [formData, setFormData] = useState({
    planName: newPlanName,
    price: newPrice,
    userID: userID,
    imageURL: imageURL,
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
    console.log(handleChange);
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    console.log(handleImageUpload);
    setFormData({ ...formData, imageURL: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to Update the agent using Axios
    console.log(`id=${id}, ${newPlanName}`);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle the case when the token is not available (user is not logged in)
        console.error("Token not found. User is not logged in.");
        toast.error("Please log in first");
        return;
      }
      const res = axios
        .put(`${baseURL}plans/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(`responEditresult=${result.status}`);
          toast.success("Plan updated");
          setTimeout(() => {
            router.push("/plans");
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
    <div className="pt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white  rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Plan Name:</label>
          <input
            value={formData.planName}
            onChange={handleChange}
            type="text"
            name="planName"
            placeholder="Plan Name"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price:</label>
          <input
            value={formData.price}
            onChange={handleChange}
            type="text"
            placeholder="Price"
            name="price"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        {/* <div className="mb-4">
        <label className="block text-gray-700">User ID</label>
        <input
          defaultValue={userID}
          type="text"
          disabled
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        />
      </div> */}
        <div className="mb-4">
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <button
          className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Update Plan
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
