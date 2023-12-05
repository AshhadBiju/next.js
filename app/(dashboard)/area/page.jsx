"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "../../utils/constants";
import Link from "next/link";
//import { toast, ToastContainer } from "react-toastify";
import { Toaster, toast } from "sonner";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { MdFilterListAlt } from "react-icons/md";
import { PlusIcon } from "@heroicons/react/outline";
//import "react-toastify/dist/ReactToastify.css";
import tablesize from "../../tablestyle.css";

const Area = () => {
  const [areaData, setAreaData] = useState([]);
  const [areas, setAreas] = useState([]);
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
      setAreaData(response.data);
      setAreas(response.data.data);
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
        selectedFilter === "city"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&city=${searchInput}`
          : selectedFilter === "district"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&district=${searchInput}`
          : selectedFilter === "state"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&state=${searchInput}`
          : selectedFilter === "pincode"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&pincode=${searchInput}`
          : selectedFilter === "userID"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&userID=${searchInput}`
          : value === "reset"
          ? window.location.reload()
          : `${baseURL}area/all_by_filter?page=${currentPage}`;
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
        value === "city"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&sortBy=city`
          : value === "district"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&sortBy=district`
          : value === "state"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&sortBy=state`
          : value === "pincode"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&sortBy=pincode`
          : value === "userID"
          ? `${baseURL}area/all_by_filter?page=${currentPage}&sortBy=userID`
          : `${baseURL}area/all_by_filter?page=${currentPage}`;
      console.log(url);
      fetchData(url);
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };

  const applySorting = () => {
    // Add sorting logic based on the selected field and order
    const sortedAreas = [...users].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Implement your custom sorting logic here
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setAreas(sortedAreas);
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
    fetchData(`${baseURL}area/all_by_filter?page=${currentPage}`);
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
              <option value="city">City</option>
              <option value="district">District</option>
              <option value="state">State</option>
              <option value="pincode">Pincode</option>
              <option value="userID">UserID</option>
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
              className="p-2 border rounded-md text-black ml-16"
            >
              <option value="" disabled hidden>
                Sort By
              </option>
              <option value="city">Sort By City</option>
              <option value="district">Sort By District</option>
              <option value="state">Sort By State</option>
              <option value="pincode">Sort By Pincode</option>
              <option value="userID">Sort By UserID</option>
              <option value="reset">Reset</option>
            </select>
          </div>
          <div className={tablesize.fullWidthTable}>
            <table className="w-full table-fixed text-center items-center border-black bg-white">
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
                          href={`/area/edit/${data.id}`}
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
            href="/area/add"
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

export default Area;
