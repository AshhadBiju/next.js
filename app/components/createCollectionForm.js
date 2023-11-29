"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCollection = () => {
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    customerID: "",
    userID: userID,
  });

  const [token, setToken] = useState("");
  const [customers, setCustomers] = useState([]); // New state for customers

  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
    const userID = localStorage.getItem("userID");
    axios
      .get(`${baseURL}customer/getAll?userID=${userID}`, {
        headers: {
          "Cache-Control": "no-store",
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
      .then((response) => {
        console.log("Customer data:", response.data);
        setCustomers(response.data); // Set customer data in the state
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
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
    if (!token) {
      toast.error("Please log in first");
      // Handle the case when the token is not available (user is not logged in)
      console.error("Token not found. User is not logged in.");
      return;
    }

    console.log("Form submitted"); // Add this line
    // Send a POST request to your API to create the agent using Axios
    axios
      .post(`${baseURL}collection/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Collection created:", response.data);
        toast.success("Collection has been created"); // You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.
        setTimeout(() => {
          router.push("/collection");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating Collection:", error);
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
          <label className="block text-gray-700">Customer Name:</label>
          <select
            name="customerID"
            value={formData.customerID}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          >
            <option value="" disabled>
              Select a Customer Name
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            pattern="[0-8]*" // Only allow numbers
            title="Please enter only numeric values"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            title="Please enter only numeric values"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>

        <button
          className="w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Create Collection
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default CreateCollection;
