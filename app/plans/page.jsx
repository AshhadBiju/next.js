"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageBaseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
//import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import "tailwindcss/tailwind.css";

const Plans = () => {
  const [planData, setPlanData] = useState([]);
  const [plans, setPlans] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);
        const userID = localStorage.getItem("userID");
        if (!token) {
          // Display an error message or toast if there is no token
          toast.error("Please log in first.");
          // You may also redirect the user to the login page
          return;
        }

        const response = await axios.get(
          `${baseURL}plans/all_by_filter?userID=${userID}`,
          {
            headers: {
              "Cache-Control": "no-store",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setPlanData(response.data);
        setPlans(response.data.data);
        localStorage.setItem("dataId", response.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deletePlan = async (id, city) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };

    const shouldDelete = window.confirm(
      `Are you sure you want to delete Plan ${city}?`
    );

    if (!shouldDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        `${baseURL}plans/delete/${id}`,
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

  //const imageBaseURL = "http://localhost:3001";

  return (
    <div>
      {!token ? (
        <div className="m-7 flex flex-col items-center">
          <p className="text-2xl">You are not logged in. Please log in.</p>
          <button
            className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3"
            type="submit"
            onClick={() => router.push("/")}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <>
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
                      <td className="py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        {data.planName}
                      </td>
                      <td className="py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        <img
                          src={`${imageBaseURL}${data.imageURL}`}
                          width="50"
                          height="50"
                          alt="Image"
                        />
                      </td>
                      <td className="py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        {data.price}
                      </td>
                      <td className="py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90 flex justify-center items-center">
                        <Link
                          className="hover:text-sky-400 transition-colors p-2"
                          href={`/updatePlan/${data.id}`}
                        >
                          <AiOutlineEdit />
                        </Link>
                        <button
                          className="hover:text-sky-400 transition-colors p-2"
                          onClick={() => deletePlan(data.id, data.planName)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <ToastContainer autoClose={3000} />
        </>
      )}
    </div>
  );
};

export default Plans;
