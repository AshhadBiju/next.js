"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageBaseURL } from "../../utils/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/outline";
import { Toaster, toast } from "sonner";
import { AiOutlineEdit } from "react-icons/ai";
import { MdFilterListAlt } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import "tailwindcss/tailwind.css";
import tablesize from "../../tablestyle.css";

const Plans = () => {
  const [planData, setPlanData] = useState([]);
  const [plans, setPlans] = useState([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const router = useRouter();

  async function fetchData(url) {
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
      console.log("Response data:", response.data.data);
      localStorage.setItem("dataId", response.data.id);
      setPlanData(response.data);
      setPlans(response.data.data);
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
        selectedFilter === "planName"
          ? `${baseURL}plans/all_by_filter?page=${currentPage}&planName=${searchInput}`
          : selectedFilter === "userID"
          ? `${baseURL}plans/all_by_filter?page=${currentPage}&userID=${searchInput}`
          : `${baseURL}plans/all_by_filter?page=${currentPage}`;
      console.log(url);
      fetchData(url);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortField(value);
    setCurrentPage(1);
    try {
      console.log(selectedFilter);
      const url =
        value === "planName"
          ? `${baseURL}plans/all_by_filter?page=${currentPage}&sortBy=planName`
          : value === "userID"
          ? `${baseURL}plans/all_by_filter?page=${currentPage}&sortBy=userID`
          : value === "reset"
          ? window.location.reload()
          : `${baseURL}plans/all_by_filter?page=${currentPage}`;
      console.log(url);
      fetchData(url);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };
  const applySorting = () => {
    // Add sorting logic based on the selected field and order
    const sortedPlans = [...users].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Implement your custom sorting logic here
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setPlans(sortedPlans);
  };

  const applyFilter = () => {
    if (searchInput !== "") {
      setCurrentPage(1);
      fetchFilterAppData();
    } else {
      toast.error("Search input cannot be empty.");
    }
  };

  useEffect(() => {
    fetchData(`${baseURL}plans/all_by_filter?page=${currentPage}`);
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
          <div className="flex ">
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
              className="p-2 border rounded-md text-black ml-2"
            >
              <option value="" disabled hidden>
                Select an option
              </option>
              <option value="planName">Plan-Name</option>
              <option value="userID">User ID</option>
            </select>
            <button
              onClick={applyFilter}
              className="ml-2 p-2 bg-blue-800 text-white rounded-md flex items-center"
            >
              <MdFilterListAlt className="mr-2" />
              Filter
            </button>
          </div>
          <div className=" flex sort">
            <select
              value={sortField}
              onChange={handleSortChange}
              className="p-2 border rounded-md text-black ml-10"
            >
              <option value="" disabled hidden>
                Sort By
              </option>
              <option value="planName">Sort By Plan-Name</option>
              <option value="userID">Sort By User ID</option>
              <option value="reset">Reset</option>
            </select>
          </div>

          <div className={tablesize.fullWidthTable}>
            <table className="w-full table-fixed text-center items-center border-black bg-white">
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
                          href={`plans/edit/${data.id}`}
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
            href="/plans/add"
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

export default Plans;
