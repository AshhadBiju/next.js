"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter(); //just before the handleSubmit where the agent created response is stored

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to create the agent using Axios
    axios
      .post("http://localhost:3001/api/users/createuser", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Agent created:", response.data);
        toast.success("Agent has been created"); // You can handle success or display a success message here. import { toast, ToastContainer } from 'react-toastify' also.

        router.push("/agents"); //this is the code to redirect to agents page. SET ALWAYS IN RESPONSE. Set a timeout to redirect as well. import this before handlesubmit const router = useRouter(); and this import { useRouter } from 'next/navigation';
      })
      .catch((error) => {
        console.error("Error creating agent:", error);
        // Handle the error and display an error message if needed
      });
  };

  const inputFields = [
    {
      label: "Username",
      type: "text",
      name: "userName",
      value: formData.userName,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: formData.password,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      value: formData.email,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phoneNumber",
      value: formData.phoneNumber,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phoneNumber",
      value: formData.phoneNumber,
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <form
      className=" w-full text-[#181818] p-2   h-full shadow-2xl bg-sky-200"
      onSubmit={handleSubmit}
    >
      {inputFields.map((eachInputField, index) => (
        <div className="w-full flex py-2" key={index}>
          <div className="w-[15%]">
            <label>{eachInputField.label}</label>
          </div>
          <div className="my-auto mx-2">:</div>
          <input
            type={eachInputField.type}
            name={eachInputField.name}
            value={eachInputField.value}
            className="h-10 px-2 rounded-md"
            onChange={eachInputField.onChange}
            required
          />
        </div>
      ))}

      <button
        className="bg-sky-700 py-2 px-4 rounded transition-all  text-white hover:scale-[95%]"
        type="submit"
      >
        Create Agent
      </button>
    </form>
  );
};

export default CreateAgent;
