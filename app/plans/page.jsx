"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
//import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import "tailwindcss/tailwind.css";

const Plans = () => {
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/plans/getAll",
          { headers: { "Cache-Control": "no-store" } }
        );
        setPlanData(response.data);
        localStorage.setItem("dataId", response.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deletePlan = async (id, city) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Authorization': `Bearer ${token}`
      }
    };

    const shouldDelete = window.confirm(`Are you sure you want to          delete Plan ${city}?`);

    if (!shouldDelete) {
      return; 
    }
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/plans/delete/${id}`, 
        config
      );
      console.log(`res=${response.status}`);
      if (response.status === 200) {
       
        toast.success(`Plan ${city} has been deleted.`);
       
 console.log(`Plan ${city} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
     
 } else {
        toast.error(`Failed to delete plan ${city}`);
        console.error(`Failed to delete plan ${city}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  
  const router = useRouter();


  const imageBaseURL = "http://localhost:3001";


  return (
    <div>
      <Link
        href="/createPlan"
        className="bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors"
      >
        Create Plans
      </Link>
      <h1 className="absolute top-5 left-40">Plans</h1>
      <div className="flex justify-center items-center">
        <table className="shadow-2xl divide-gray-200 border-2 border-cyan-200 w-6/12 overflow-hidden bg-sky-200">
          <thead className="text-white">
            <tr>
              <th className="bg-sky-500 py-3 text-white">PLAN</th>
              <th className="bg-sky-500 py-3 text-white">PLAN IMAGE</th>
              <th className="bg-sky-500 py-3 text-white">PRICE</th>
              <th className="bg-sky-500 py-3 text-white">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 text-center">
            {planData &&
              planData.map((data) => (
                <tr key={data.id}>
                  <td className="py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                    {data.planName}
                  </td>
                  <img
                    src={`${imageBaseURL}${data.imageURL}`}
                    width="50"
                    height='50'
                    alt="Image"
                  />

                  <td className="py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                    {data.price}
                  </td>
                  <td className="py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                    <Link
                      className="hover:text-sky-400 transition-colors p-2"
                      href={`/updatePlan/${data.id}`}
                    >
                      <AiOutlineEdit />
                    </Link>
                    <button
                      className="hover:text-sky-400 transition-colors p-2"
                      onClick={() => deletePlan(data.id, data.planName)}>
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ToastContainer autoClose={3000} /> 
    </div>
  );
};

export default Plans;
