"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageBaseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
//import Image from "next/image";
import { PlusIcon } from "@heroicons/react/outline";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import "tailwindcss/tailwind.css";

const Plans = () => {
  const [planData, setPlanData] = useState([]);
  const [plans, setPlans] = useState([]);
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
      const response = await axios.get(
        `${baseURL}plans/all_by_filter?userID=${userID}&page=${currentPage}`,
        {
          headers: {
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("After axios call");
      console.log(response.data);
      setPlanData(response.data);
      setPlans(response.data.data);
      localStorage.setItem("dataId", response.data.id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, [currentPage]);

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

  //const imageBaseURL = "http://localhost:3001";
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

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
          <h1 className="absolute top-5 left-40">Plans</h1>
          <div className="flex justify-center items-center pt-20">
            <table className="shadow-2xl w-9/12 overflow-hidden bg-white ">
              <thead className="text-white">
                <tr>
                  <th className="bg-blue-800 py-3 text-white">PLAN IMAGE</th>
                  <th className="bg-blue-800 py-3 text-white">PLAN </th>
                  <th className="bg-blue-800 py-3 text-white">PRICE</th>
                  <th className="bg-blue-800 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-cyan-900 text-center">
                {planData &&
                  plans.map((data) => (
                    <tr key={data.id}>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        <img
                          src={`${imageBaseURL}${data.imageURL}`}
                          width="50"
                          height="50"
                          alt="Image"
                        />
                      </td>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        {data.planName}
                      </td>

                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        {data.price}
                      </td>
                      <td className="py-3 px-6  cursor-pointer duration-300 hover:scale-90 flex justify-center items-center">
                        <Link
                          className="hover:text-sky-400 transition-colors p-2"
                          href={`/updatePlan/${data.id}`}
                        >
                          <AiOutlineEdit />
                        </Link>
                        <button
                          className="hover:text-red-500 transition-colors p-2"
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
              disabled={!planData.hasNext}
              className={`mx-2 p-2 border rounded-lg ${
                !planData.hasNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>

          <Link
            href="/createPlan"
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

export default Plans;
