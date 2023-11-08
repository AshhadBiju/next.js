"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePlanForm = () => {
  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    userID: "",
    imageURL: null,
  });

  
  console.log(CreatePlanForm);


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

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      console.error('Token not found. User is not logged in.');
      return;
  }
    console.log(handleSubmit);
    axios
      .post("http://localhost:3001/api/plans/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-store",
          'Authorization': `Bearer ${token}`
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
        // Handle the error and display an error message if needed
      });
  };
  return (
    <form
      className="absolute right-20 top-20 shadow-2xl bg-sky-200"
      onSubmit={handleSubmit}
    >
      <div>
        <label>Plan Name:</label>
        <input
          type="text"
          name="planName"
          value={formData.planName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>User ID</label>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="image"
          onChange={handleImageUpload}
          required
        />
      </div>
      <button className="bg-sky-700" type="submit">
        Create Plan
      </button>
      <ToastContainer /> {/* Add this component at the root level */}
    </form>
  );
};

export default CreatePlanForm;
