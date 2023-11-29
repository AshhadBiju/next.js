"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/utils/constants";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { PlusIcon } from "@heroicons/react/outline";
import "react-toastify/dist/ReactToastify.css";

const Area = () => {
  const [areaData, setAreaData] = useState([]);
  const [areas, setAreas] = useState([]);
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
        `${baseURL}area/all_by_filter?userID=${userID}&page=${currentPage}`,
        {
          headers: {
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setAreaData(response.data);
      setAreas(response.data.data);
      setLoading(false);
      // localStorage.setItem("dataId", response.data.id);
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

  const deleteArea = async (id, city) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };
    const shouldDelete = window.confirm(
      `Are you sure you want to delete area ${city}?`
    );

    if (!shouldDelete) {
      return; // Cancel deletion if the user clicks "Cancel" in the confirmation dialog.
    }
    try {
      const response = await axios.delete(
        `${baseURL}area/delete/${id}`,
        config
      );
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        // The area was successfully deleted.
        toast.success(`Area ${city} has been deleted.`);
        console.log(`Area ${city} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete Area ${city}`);
        console.error(`Failed to delete Area ${city}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
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

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
        </div>
      ) : !token ? (
        <div className="m-7 flex flex-col items-center">
          <p className="text-2xl">You are not logged in. Please log in.</p>
          <button
            className="block mx-auto bg-blue-800 text-white px-4 py-2 rounded-md m-3"
            type="button"
            onClick={() => router.push("/")}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <h1 className="absolute top-5 left-40">Area </h1>
          <div className="flex justify-center items-center pt-20">
            <table className="shadow-2xl w-9/12 overflow-hidden bg-white p-10 ">
              <thead className="text-white">
                <tr>
                  <th className="bg-blue-800 py-3 text-white">CITY</th>
                  <th className="bg-blue-800 py-3 text-white">DISTRICT</th>
                  <th className="bg-blue-800 py-3 text-white">PINCODE</th>
                  <th className="bg-blue-800 py-3 text-white">STATE</th>
                  <th className="bg-blue-800 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-cyan-900 text-center">
                {areaData &&
                  areas.map((data) => (
                    <tr key={data.id}>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.city}
                      </td>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.district}
                      </td>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.pincode}
                      </td>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.state}
                      </td>
                      <td className="py-3 px-6 hover-bg-blue-800 cursor-pointer duration-300 hover:scale-90 flex justify-center items-center">
                        <Link
                          className="hover:text-blue-800 transition-colors p-2"
                          href={`/updatearea/${data.id}`}
                        >
                          <AiOutlineEdit />
                        </Link>
                        <button
                          className="hover:text-red-600 transition-colors p-2"
                          onClick={() => deleteArea(data.id, data.city)}
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
              disabled={!areaData.hasNext}
              className={`mx-2 p-2 border rounded-lg ${
                !areaData.hasNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>

          <Link
            href="/createArea"
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

export default Area;
