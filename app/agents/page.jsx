"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/utils/constants";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import deleteUser from '../components/deleteagent'

const Agents = () => {
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  const router = useRouter();

  const fetchAppData = async () => {
    try {
      const token=localStorage.getItem("token");
      console.log("Before axios call");
      const response = await axios.get(
        `${baseURL}users/all_by_filter`,
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
      setUsers(response.data.data)
      localStorage.setItem("dataId", response.data.id);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };
  

  useEffect(() => {
    
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
    fetchAppData();
  }, []);
  

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

  if (!token) {
    return (
      <div className="m-7 flex flex-col items-center">
        <p className="text-2xl">You are not logged in. Please log in.</p>
        <button
          className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3"
          type="button"
          onClick={() => router.push("/")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    //<PrivateRoute>
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
            href="/createagent"
            className="bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors"
          >
            Create Agents
          </Link>
          <div>
            {usersData.totalCount}
          </div>
          <div className="flex justify-center items-center">
            <table className="shadow-2xl divide-gray-200 border-2 border-cyan-200 w-6/12 overflow-hidden bg-sky-200">
              <thead className="text-white">
                <tr>
                  <th className="bg-sky-500 py-3 text-white">NAME</th>
                  <th className="bg-sky-500 py-3 text-white">EMAIL</th>
                  <th className="bg-sky-500 py-3 text-white">ROLE</th>
                  <th className="bg-sky-500 py-3 text-white">PHONENUMBER</th>
                  <th className="bg-sky-500 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-cyan-900 text-center">
                {usersData &&
                  users.map((data) => (
                    <tr key={data.id}>
                      <td className="py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        {data.name}
                      </td>
                      <td className="py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        {data.email}
                      </td>
                      <td className="py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        {data.role}
                      </td>
                      <td className="py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        {data.phoneNumber}
                      </td>
                      <td className="py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90">
                        <div className="flex items-center justify-center space-x-4">
                          <Link
                            className="hover:text-sky-400 transition-colors p-2"
                            href={`/updateagent/${data.id}`}
                          >
                            {" "}
                            <AiOutlineEdit />
                          </Link>
                          <button
                            className="hover:text-sky-400 transition-colors p-2"
                            onClick={() => deleteUser(data.id, data.name)}
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
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

export default Agents;
