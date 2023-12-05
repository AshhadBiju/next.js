"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const CreateCustomerForm = () => {
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    registerNumber: "",
    address: "",
    userID: userID,
    areaID: "",
    planID: "",
  });

  const [token, setToken] = useState("");
  const [areasData, setAreaData] = useState([]);
  const [areas, setAreas] = useState([]); // State for areas
  const [plans, setPlans] = useState([]); // State for plans

  const router = useRouter(); //just before the handleSubmit where the agent created response is stored

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
    const userID = localStorage.getItem("userID");
    axios
      .get(`${baseURL}area/getall?userID=${userID}`, {
        headers: {
          "Cache-Control": "no-store",
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
      .then((response) => {
        console.log("Areas data:", response.data); // Log the data here
        setAreas(response.data); // Set area data in the state
      })
      .catch((error) => {
        console.error("Error fetching area data:", error);
      });
    // Fetch plans
    axios
      .get(`${baseURL}plans/getAll?userID=${userID}`, {
        headers: {
          "Cache-Control": "no-store",
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
      .then((response) => {
        console.log("Plans data:", response.data);
        setPlans(response.data); // Set plan data in the state
      })
      .catch((error) => {
        console.error("Error fetching plan data:", error);
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
      console.error("Token not found. User is not logged in.");
      return;
    }

    console.log("Form submitted");

    axios
      .post(`${baseURL}customer/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Customer created:", response.data);
        toast.success("Customer has been created");
        setTimeout(() => {
          router.push("/customer");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating Customer:", error);
        toast.error("Error creating Customer");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white  rounded-md shadow-md text-[#181818]"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mobile Number:</label>
        <input
          type="number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          pattern="[0-10]*" // Only allow numbers
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Register Number:</label>
        <input
          type="number"
          name="registerNumber"
          value={formData.registerNumber}
          onChange={handleChange}
          required
          title="Please enter only numeric values"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Area:</label>
        <select
          name="areaID"
          value={formData.areaID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        >
          <option value="" disabled>
            Select an Area
          </option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.city}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Plan:</label>
        <select
          name="planID"
          value={formData.planID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
        >
          <option value="" disabled>
            Select a Plan
          </option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.planName}
            </option>
          ))}
        </select>
      </div>
      <button
        className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
        type="submit"
      >
        Create Customer
      </button>
      <Toaster richColors />
    </form>
  );
};

export default CreateCustomerForm;
