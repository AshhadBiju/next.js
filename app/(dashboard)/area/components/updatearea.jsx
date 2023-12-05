"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { baseURL } from "../../../utils/constants";
import { Toaster, toast } from "sonner";
//import { toast, ToastContainer } from "react-toastify";

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
  const [newUserID, setNewUserID] = useState(userID);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle the case when the token is not available (user is not logged in)
      toast.error("Please log in first");
      console.error("Token not found. User is not logged in.");
      return;
    }
    axios
      .put(
        `${baseURL}area/update/${id}`,
        {
          city: newCity,
          state: newState,
          district: newDistrict,
          pincode: newPincode,
          userID: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(`responEditresult=${result.status}`);
        toast.success("Area has been updated");
        setTimeout(() => {
          router.push("/area");
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.log(`responEditerror=${error}`);
        toast.error("Error updating Area");
      });
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white  rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">City:</label>
          <input
            onChange={(e) => setnewCity(e.target.value)}
            value={newCity}
            type="text"
            placeholder="City"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">District:</label>
          <input
            onChange={(e) => setnewDistrict(e.target.value)}
            value={newDistrict}
            type="text"
            placeholder="District"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">State:</label>
          <input
            onChange={(e) => setnewState(e.target.value)}
            value={newState}
            type="text"
            placeholder="State"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pincode:</label>
          <input
            onChange={(e) => setnewPincode(e.target.value)}
            value={newPincode}
            type="text"
            placeholder="Pincode"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>

        <button
          className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Update Area
        </button>
        <Toaster richColors />
      </form>
    </div>
  );
}
