//import Head from 'next/head';
//import CreateAgent from '../components/createAgent'

//const CreateAreaForm = () => {
//return (
//<div>
// <Head>
//  <title>Create Agent</title>
//</Head>
//  <h1>Create Agent</h1>
/// <CreateAgent />
// </div>
//);
//};

//export default CreateAreaForm;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { baseURL } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
//import { toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);

    if (!tokenFromStorage) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setFormData({ ...formData, [name]: value });
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (formData.password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true);

    axios
      .post(`${baseURL}users/createuser`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Agent created:", response.data);
        console.log(response);
        toast.success("Agent has been created");
        setTimeout(() => {
          router.push("/agents");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating Agent:", error);
        toast.error("Error creating Agent");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="pt-11">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-800"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-[#181818]"
        >
          <div className="mb-4">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
            />
          </div>
          <div className="mb-4">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
            />
          </div>
          <div className="mb-4">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
            />
          </div>
          <div className="mb-4">
            <label>Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
            />
          </div>
          <div className="mb-4">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
            />
          </div>
          <div className="mb-4">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
            />
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
            </div>
          )}

          <button
            className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Agent..." : "Create Agent"}
          </button>
          <Toaster richColors />
        </form>
      )}
    </div>
  );
};

export default CreateAgent;
