"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/outline";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import "tailwindcss/tailwind.css";

const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [collection, setCollection] = useState([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);

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
        `${baseURL}collection/all_by_filter?page=${currentPage}&userID=${userID}`,
        {
          headers: {
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCollectionData(response.data);
      setCollection(response.data.data);
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

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
    const userID = localStorage.getItem("userID");
    axios
      .get(`${baseURL}customer/getAll?userID=${userID}`, {
        headers: {
          "Cache-Control": "no-store",
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });

    if (!tokenFromStorage) {
      router.push("/");
    }
  }, [router]);

  const deleteCollection = async (id, date, description) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${token}`,
      },
    };

    const shouldDelete = window.confirm(
      `Are you sure you want to delete collection ${description}?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${baseURL}collection/delete/${id}`,
        config
      );
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        toast.success(`Collection ${description} has been deleted.`);
        console.log(`Collection ${description} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error(`Failed to delete collection ${description}`);
        console.error(`Failed to delete collection ${description}`);
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
          <h1 className="absolute top-5 left-40">Collection</h1>
          <div className="flex justify-center items-center pt-20">
            <table className="shadow-2xl border-2  w-9/12 overflow-hidden bg-white">
              <thead className="text-white">
                <tr>
                  <th className="bg-blue-800 py-3 text-white">DATE</th>
                  <th className="bg-blue-800 py-3 text-white">DESCRIPTION</th>
                  <th className="bg-blue-800 py-3 text-white">AMOUNT</th>
                  <th className="bg-blue-800 py-3 text-white">CUSTOMER</th>
                  <th className="bg-blue-800 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-cyan-900 text-center">
                {collectionData &&
                  collection.map((data) => (
                    <tr key={data.id}>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        {data.date}
                      </td>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        {data.description}
                      </td>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        {data.amount}
                      </td>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90">
                        {/* Find the corresponding customer */}
                        {
                          customers.find(
                            (customer) => customer.id === data.customerId
                          )?.name
                        }
                      </td>
                      <td className="py-3 px-6 cursor-pointer duration-300 hover:scale-90 flex justify-center items-center">
                        <Link
                          className="hover:text-blue-800 transition-colors p-2"
                          href={`/updatecollection/${data.id}`}
                        >
                          <AiOutlineEdit />
                        </Link>
                        <button
                          className="hover:text-red-500 transition-colors p-2"
                          onClick={() =>
                            deleteCollection(
                              data.id,
                              data.date,
                              data.description
                            )
                          }
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
              disabled={!collectionData.hasNext}
              className={`mx-2 p-2 border rounded-lg ${
                !collectionData.hasNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>

          <Link
            href="/createCollection"
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

export default Collection;
