"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { baseURL } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";

const CreatePlanForm = () => {
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    userID: userID,
    imageURL: null,
  });

  const [token, setToken] = useState("");

  const router = useRouter();

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
    //console.log(handleChange);
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    //console.log(handleImageUpload);
    setFormData({ ...formData, imageURL: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // setFormData({ ...formData, userID: userID });
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      console.error("Token not found. User is not logged in.");
      return;
    }
    console.log(handleSubmit);
    axios
      .post(`${baseURL}plans/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Plan created:", response.data);
        toast.success("Plan created");
        setTimeout(() => {
          router.push("/plans");
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.error("Error creating Plan:", error);
        toast.error("Error creating Plan");
        // Handle the error and display an error message if needed
      });
  };
  return (
    <div className="pt-11">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label htmlFor="planName" className="block text-gray-700">
            Plan Name:
          </label>
          <input
            type="text"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            title="Please enter only numeric values"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        {/* <div className="mb-4">
        <label>User ID</label>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        />
      </div> */}
        <div className="mb-4">
          <label>Image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleImageUpload}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <button
          className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Create Plan
        </button>
        <Toaster richColors />
      </form>
    </div>
  );
};

export default CreatePlanForm;
