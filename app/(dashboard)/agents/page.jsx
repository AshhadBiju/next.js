"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "../../utils/constants";
import { MdFilterListAlt } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Toaster, toast } from "sonner";
//import "react-toastify/dist/ReactToastify.css";
import tablesize from "../../tablestyle.css";

const Agents = () => {
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const router = useRouter();

  async function fetchAppData(url) {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Before axios call");
      const response = await axios.get(url, {
        headers: {
          "Cache-Control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("After axios call");
      console.log("Response data:", response.data.rows);
      localStorage.setItem("dataId", response.data.id);
      setUsersData(response.data);
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  }

  const fetchFilterAppData = async () => {
    try {
      console.log(selectedFilter);
      const url =
        selectedFilter === "name"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&name=${searchInput}`
          : selectedFilter === "email"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&email=${searchInput}`
          : selectedFilter === "phoneNumber"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&phoneNumber=${searchInput}`
          : selectedFilter === "username"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&username=${searchInput}`
          : selectedFilter === "role"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&role=${searchInput}`
          : `${baseURL}users/all_by_filter?page=${currentPage}`;
      console.log(url);
      fetchAppData(url);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortField(value);
    setCurrentPage(1);
    // Toggle the sort order when the same field is clicked again
    try {
      console.log(selectedFilter);
      const url =
        value === "name"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=name`
          : value === "email"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=email`
          : value === "phoneNumber"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=phoneNumber`
          : value === "username"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=username`
          : value === "role"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=role`
          : value === "status"
          ? `${baseURL}users/all_by_filter?page=${currentPage}&sortBy=isActive`
          : value === "reset"
          ? window.location.reload()
          : `${baseURL}users/all_by_filter?page=${currentPage}`;
      console.log(url);
      fetchAppData(url);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };

  const applySorting = () => {
    // Add sorting logic based on the selected field and order
    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Implement your custom sorting logic here
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setUsers(sortedUsers);
  };

  const applyFilter = () => {
    //if (searchInput !== "") {
    setCurrentPage(1);
    fetchFilterAppData();
    // } else {
    //   toast.error("Search input cannot be empty.");
    // }
  };

  useEffect(() => {
    fetchAppData(`${baseURL}users/all_by_filter?page=${currentPage}`);
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, [currentPage]);

  const toggleUserActive = async (id, name) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };

    const shouldActive = window.confirm(
      `Are you sure you want to change the status of ${name}?`
    );

    if (!shouldActive) {
      return;
    }

    try {
      const response = await axios.put(
        `${baseURL}users/active/${id}`,
        {},
        config
      );

      if (response.status === 200) {
        const updatedUser = response.data; // Update this based on your API response

        // Update the user's status in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isActive: updatedUser.isActive } : user
          )
        );

        toast.success(
          `User is now ${updatedUser.isActive ? "Active" : "In-active"}.`
        );

        // Note: You may not need to refresh the data here if your API response contains the updated user information.
      } else {
        toast.error(`Failed to toggle active status for user ${name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

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
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="p-2 border rounded-md text-black mr-2"
            />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="p-2 border rounded-md text-black"
            >
              {/* <option></option> */}
              <option value="" disabled hidden>
                Select an option
              </option>
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phoneNumber">PhoneNumber</option>
              <option value="username">Username</option>
              <option value="role">Role</option>
            </select>
            <button
              onClick={applyFilter}
              className="ml-2 p-2 bg-blue-800 text-white rounded-md flex items-center"
            >
              <MdFilterListAlt className="mr-2" />
              Filter
            </button>
          </div>
          <div className=" flex sort ">
            <select
              value={sortField}
              onChange={handleSortChange}
              className="p-2 border rounded-md text-black ml-2"
            >
              <option value="" disabled hidden>
                Sort By
              </option>
              <option value="name">Sort By Name</option>
              <option value="email">Sort By Email</option>
              <option value="phoneNumber">Sort By Phone Number</option>
              <option value="role">Sort By Role</option>
              <option value="status">Sort By Status</option>
              <option value="reset">Reset</option>
            </select>
          </div>
          <div className={tablesize.fullWidthTable}>
            <table className="w-full table-fixed text-center items-center border-black bg-white">
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
                            href={`/agents/edit/${data.id}`}
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
                            {data.isActive ? "Active" : "Deactive"}
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
            href="/agents/add"
            className="bg-blue-800 text-white p-2 rounded-3xl fixed bottom-10 right-24 hover:text-black transition-colors"
          >
            <PlusIcon className="h-8 w-8 " />
          </Link>
          <Toaster richColors />
        </>
      )}
    </div>
  );
};
export default Agents;
