// components/LoginForm.js
"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSuccess = async (token) => {
    console.log("Handling login success");
    localStorage.setItem("token", token);
    toast.success("Logged In ");
    setTimeout(() => {
      router.push("/agents");
    }, 3000);
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
    toast.error("Login failed. Please check your credentials.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        handleLoginSuccess(data.token); // Save the token
        console.log("Successful login", data);
      } else {
        handleLoginFailure(response.statusText);
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      handleLoginFailure(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-sky-300  rounded-md shadow-md text-[#181818]"
    >
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">
          Username:
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>
      <button
        className={`w-full py-2 text-white bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging In..." : "LOGIN AGENT"}
      </button>
      <ToastContainer /> {/* Add this component at the root level */}
    </form>
  );
}
