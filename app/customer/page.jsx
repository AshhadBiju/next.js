"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/utils/constants";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/outline";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import "tailwindcss/tailwind.css";

const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Before axios call");
      const userID = localStorage.getItem("userID");
      console.log(userID);
      const response = await axios.get(
        `${baseURL}customer/all_by_filter?page=${currentPage}&userID=${userID}`,
        {
          headers: {
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setCustomerData(response.data);
      setCustomer(response.data.data);
      localStorage.setItem("dataId", response.data.id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
    const tokenFromStorage = localStorage.getItem("token");
    console.log("Token from storage:", tokenFromStorage);
    setToken(tokenFromStorage);
  }, [currentPage]);

  const deleteCustomer = async (id, name) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };

    const shouldDelete = window.confirm(
      `Are you sure you want to delete customer ${name}?`
    );

    if (!shouldDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        `${baseURL}customer/delete/${id}`,
        config
      );
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        toast.success(`Customer ${name} has been deleted.`);

        console.log(`Customer ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error(`Failed to delete customer ${name}`);
        console.error(`Failed to delete customer ${name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  console.log("Customer Data:", customerData);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-800"></div>
        </div>
      ) : !token ? (
        <div className="m-7 flex flex-col items-center">
          <p className="text-2xl">You are not logged in. Please log in.</p>
          <button
            className="block mx-auto bg-blue-800 text-white px-4 py-2 rounded-md m-3"
            type="submit"
            onClick={() => router.push("/")}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <h1 className="absolute top-5 left-40">Customer</h1>
          <div className="flex justify-center items-center pt-20">
            <table className="shadow-2xl  border-2  w-9/12 overflow-hidden bg-white">
              <thead className="text-white">
                <tr>
                  <th className="bg-blue-800 py-3 text-white">REG NO</th>
                  <th className="bg-blue-800 py-3 text-white">NAME</th>
                  <th className="bg-blue-800 py-3 text-white">ADDRESS</th>
                  <th className="bg-blue-800 py-3 text-white">MOBILE NUMBER</th>
                  <th className="bg-blue-800 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-cyan-900 text-center">
                {customerData &&
                  customer.map((data) => (
                    <tr key={data.id}>
                      <td className="py-3 px-6 cursor-default  duration-300 ">
                        {data.registerNumber}
                      </td>
                      <td className="py-3 px-6 cursor-default duration-300 ">
                        {data.name}
                      </td>
                      <td className="py-3 px-6 cursor-default duration-300 ">
                        {data.address}
                      </td>
                      <td className="py-3 px-6 cursor-default duration-300 ">
                        {data.mobileNumber}
                      </td>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90 flex justify-center items-center">
                        <Link
                          className="hover:text-blue-800 transition-colors p-2"
                          href={`/updatecustomer/${data.id}`}
                        >
                          <AiOutlineEdit />
                        </Link>
                        <button
                          className="hover:text-red-500 transition-colors p-2"
                          onClick={() => deleteCustomer(data.id, data.name)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mx-2 p-2 border rounded-lg ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!customerData.hasNext}
              className={`mx-2 p-2 border rounded-lg ${
                !customerData.hasNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>

          <Link
            href="/createCustomer"
            className="bg-blue-800 text-black p-2 rounded-3xl fixed bottom-10 right-24 hover:text-white transition-colors"
          >
            <PlusIcon className="h-8 w-8 " />
          </Link>
          <ToastContainer autoClose={3000} />
        </>
      )}
    </div>
  );
};

export default Customer;
