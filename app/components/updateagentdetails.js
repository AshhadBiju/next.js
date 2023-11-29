"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateAgent({
  id,
  name,
  email,
  password,
  username,
  phoneNumber,
}) {
  const [newName, setnewName] = useState(name);
  const [newEmail, setnewEmail] = useState(email);
  const [newPhoneNumber, setnewPhoneNumber] = useState(phoneNumber);
  const [newPassword, setnewPassword] = useState(password);
  const [newUserName, setnewUserName] = useState(username);
  //const [newID, setId] = useState(id);

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
    setFormData({ ...formData, [name]: value });
  };

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
        `${baseURL}users/updateuser/${id}`,

        {
          name: newName,
          email: newEmail,
          phoneNumber: newPhoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(`Response status: ${response.status}`);
        toast.success(`Agent has been updated`);
        setTimeout(() => {
          router.push("/agents");
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        console.log(`responEditerror=${error}`);
        console.error(`Error response status: ${error.response.status}`);
        console.error(`Error response: ${error}`);
      });
    // console.log(`responEdit=${res.status}`);
  };

  return (
    <div className="pt-24">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            onChange={(e) => setnewName(e.target.value)}
            value={newName}
            type="text"
            placeholder="name"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            onChange={(e) => setnewEmail(e.target.value)}
            value={newEmail}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone-number:</label>
          <input
            onChange={(e) => setnewPhoneNumber(e.target.value)}
            value={newPhoneNumber}
            type="text"
            placeholder="Phone-number"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <button
          className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Update Agent
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
