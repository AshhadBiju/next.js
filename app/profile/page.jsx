"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { baseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); //just before the handleSubmit where the agent created response is stored
  //const handleChange = (e) => {
  //const { name, value } = e.target;
  //setFormData({ ...formData, [name]: value });
  //  };
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
    console.log(handleSubmit);
    console.log("Token:", token);

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
        // Handle the error and display an error message if needed
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call completes
      });
  };

  return (
    <div className="pt-11">
      <h1 className=" absolute right-52 text-[#181818]">PROFILE</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white  rounded-md shadow-md text-[#181818]"
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
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};
export default ProfilePage;
