"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/utils/constants";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { PlusIcon } from "@heroicons/react/outline";
//import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Agents = () => {
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchAppData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Before axios call");
      const response = await axios.get(
        `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=createdAt`,
        {
          headers: {
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("After axios call");
      console.log("Response data:", response.data.rows);
      setUsersData(response.data);
      setUsers(response.data.data);
      localStorage.setItem("dataId", response.data.id);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, [currentPage]);

  const toggleUserActive = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `${baseURL}users/active/${id}`,
        {},
        config
      );

      if (response.status === 200) {
        toast.success(
          `User ${data.name} is now ${
            response.data.isActive ? "active" : "inactive"
          }.`
        );
        // Refresh data after toggling user active status
        fetchAppData();
      } else {
        toast.error(`Failed to toggle active status for user ${data.name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  {
    /**useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (!token) {
          // Display an error message or toast if there is no token
          toast.error("Please log in first.");
          // You may also redirect the user to the login page
          return;
        }
        const response = await axios.get(
          "http://localhost:3001/api/users/getall",
          {
            headers: {
              "Cache-Control": "no-store",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsersData(response.data.rows);
        localStorage.setItem("dataId", response.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);**/
  }

  const deleteUser = async (id, name) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };
    const shouldDelete = window.confirm(
      `Are you sure you want to delete user ${name}?`
    );

    if (!shouldDelete) {
      return; // Cancel deletion if the user clicks "Cancel" in the confirmation dialog.
    }
    try {
      const response = await axios.delete(
        `${baseURL}users/delete/${id}`,
        config
      );
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        // The user was successfully deleted.
        toast.success(`User ${name} has been deleted.`);
        console.log(`User ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete user ${name}`);
        console.error(`Failed to delete user ${name}`);
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
          <h1 className="absolute top-5 left-40">Agents</h1>
          <div className="flex justify-center items-center pt-20">
            <table className="shadow-2xl w-9/12 overflow-hidden bg-white ">
              <thead className="text-white">
                <tr>
                  <th className="bg-blue-800 py-3 text-white">NAME</th>
                  <th className="bg-blue-800 py-3 text-white">EMAIL</th>
                  <th className="bg-blue-800 py-3 text-white">ROLE</th>
                  <th className="bg-blue-800 py-3 text-white">PHONE-NUMBER</th>
                  <th className="bg-blue-800 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-cyan-900 text-center">
                {usersData &&
                  users.map((data) => (
                    <tr key={data.id}>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.name}
                      </td>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.email}
                      </td>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.role}
                      </td>
                      <td className="py-3 px-6 hover:bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        {data.phoneNumber}
                      </td>
                      <td className="py-3 px-6 hover-bg-blue-800 cursor-pointer duration-300 hover:scale-90">
                        <div className="flex items-center justify-center space-x-4">
                          <Link
                            className="hover:text-blue-800 transition-colors p-2"
                            href={`/updateagent/${data.id}`}
                          >
                            {" "}
                            <AiOutlineEdit />
                          </Link>
                          <button
                            className="hover:text-red-600 transition-colors p-2"
                            onClick={() => deleteUser(data.id, data.name)}
                          >
                            <MdDeleteOutline />
                          </button>
                          <button
                            className={`hover:text-sky-400 transition-colors p-2 ${
                              data.isActive ? "text-green-500" : "text-red-500"
                            }`}
                            onClick={() => toggleUserActive(data.id)}
                          >
                            {data.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </div>
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
              disabled={!usersData.hasNext}
              className={`mx-2 p-2 border rounded-lg ${
                !usersData.hasNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
          <Link
            href="/createagent"
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
export default Agents;
