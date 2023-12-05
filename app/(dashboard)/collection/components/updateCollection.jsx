"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
//import { toast, ToastContainer } from "react-toastify";

export default function UpdateCollectionForm({
  id,
  amount,
  description,
  date,
  customerID,
  userID,
}) {
  const [newAmount, setnewAmount] = useState(amount);
  const [newDescription, setnewDescription] = useState(description);
  const [newDate, setnewDate] = useState(date);
  const [newCustomerID, setNewCustomerID] = useState(customerID);
  const [customers, setCustomers] = useState([]);

  const [newUserID, setNewUserID] = useState(userID);

  const [token, setToken] = useState("");

  const router = useRouter(); //just before the handleSubmit where the agent created response is stored

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
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });

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
      console.error("Token not found. User is not logged in.");
      return;
    }

    console.log(`id=${id}, ${customerID}  ${userID}`);

    axios
      .put(
        `${baseURL}collection/update/${id}`,
        {
          amount: newAmount,
          description: newDescription,
          date: newDate,
          customerID: newCustomerID,
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
        toast.success("Collection updated");
        setTimeout(() => {
          router.push("/collection");
        }, 3000);
      })
      .catch((error) => {
        console.log(`responEditerror=${error} ${res}`);
        toast.error("Error updating Collection");
      });
    console.log(`responEdit=${res.status}`);
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-[#181818]"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Date:</label>
          <input
            onChange={(e) => setnewDate(e.target.value)}
            value={newDate}
            type="text"
            placeholder="Date"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <input
            onChange={(e) => setnewDescription(e.target.value)}
            value={newDescription}
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            onChange={(e) => setnewAmount(e.target.value)}
            value={newAmount}
            type="text"
            placeholder="Amount"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer:</label>
          <select
            name="customerID"
            value={newCustomerID}
            onChange={(e) => setNewCustomerID(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-800"
          >
            <option value="" disabled>
              Select a Customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full py-2 text-white bg-blue-800 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          type="submit"
        >
          Update Collection
        </button>
        <Toaster richColors />
      </form>
    </div>
  );
}
