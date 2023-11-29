"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
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
  const [newAreaID, setNewAreaID] = useState(areaID);
  const [newPlanID, setNewPlanID] = useState(planID);
  const [newUserID, setNewUserID] = useState(userID);

  const [areas, setAreas] = useState([]); // State for areas
  const [plans, setPlans] = useState([]); // State for plans
  const [token, setToken] = useState("");

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
        setAreas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching area data:", error);
      });

    axios
      .get(`${baseURL}plans/getAll?userID=${userID}`, {
        headers: {
          "Cache-Control": "no-store",
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
      .then((response) => {
        setPlans(response.data);
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

    axios
      .put(
        `${baseURL}customer/update/${id}`,
        {
          name: newName,
          mobileNumber: newMobileNumber,
          registerNumber: newRegisterNumber,
          address: newAddress,
          areaID: newAreaID,
          planID: newPlanID,
          userID: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(`responEditresult=${response.status}`);
        toast.success("Customer updated");
        setTimeout(() => {
          router.push("/customer");
        }, 3000);
      })
      .catch((error) => {
        console.log(`responEditerror=${error}`);
      });
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white  rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            onChange={(e) => setnewName(e.target.value)}
            value={newName}
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number:</label>
          <input
            onChange={(e) => setnewMobileNumber(e.target.value)}
            value={newMobileNumber}
            type="text"
            placeholder="Mobile Number"
            require
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
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
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
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
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Area:</label>
          <select
            name="areaID"
            value={newAreaID}
            onChange={(e) => setNewAreaID(e.target.value)}
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
            value={newPlanID}
            onChange={(e) => setNewPlanID(e.target.value)}
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
          Update Customer
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
