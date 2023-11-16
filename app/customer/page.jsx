'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { baseURL } from "@/app/utils/constants";
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import "tailwindcss/tailwind.css";


const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        if (!token) {
          // Display an error message or toast if there is no token
          toast.error("Please log in first.");
          // You may also redirect the user to the login page
          return;
        }


        const response = await axios.get
        (`${baseURL}customer/getAll`, 
        { headers: { 'Cache-Control': 'no-store' ,
        'Authorization': `Bearer ${token}`
      } });
        setCustomerData(response.data);
        localStorage.setItem('dataId', response.data.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteCustomer = async (id, name) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Authorization': `Bearer ${token}`
      }
    };

    const shouldDelete = window.confirm(`Are you sure you want to          delete customer ${name}?`);

    if (!shouldDelete) {
      return; 
    }
    try {
      const response = await axios.delete(
        `${baseURL}customer/delete/${id}`, 
        config
      );
      console.log(`res=${response.status}`);
      if (response.status === 200) {
       
        toast.success(`Customer ${name} has been deleted.`);
       
 console.log(`Customer ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
     
 } else {
        toast.error(`Failed to delete customer ${name}`);
        console.error(`Failed to delete customer ${name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

 
  const router = useRouter();

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
          <Link href='/createCustomer' className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create Customer</Link>
          <h1 className='absolute top-5 left-40'>Customer</h1>
          <div className='flex justify-center items-center'>
            <table className='shadow-2xl divide-gray-200 border-2 border-cyan-200 w-6/12 overflow-hidden bg-sky-200'>
              <thead className="text-white">
                <tr>
                  <th className="bg-sky-500 py-3 text-white">REG NO</th>
                  <th className="bg-sky-500 py-3 text-white">NAME</th>
                  <th className="bg-sky-500 py-3 text-white">ADDRESS</th>
                  <th className="bg-sky-500 py-3 text-white">MOBILE NUMBER</th>
                  <th className="bg-sky-500 py-3 text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className='text-cyan-900 text-center'>
                {customerData && customerData.map((data) => (
                  <tr key={data.id}>
                    <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.registerNumber}</td>
                    <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.name}</td>
                    <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.address}</td>
                    <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.mobileNumber}</td>
                    <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90 flex justify-center items-center'>
                      <Link className='hover:text-sky-400 transition-colors p-2' href={`/updatecustomer/${data.id}`}>
                        <AiOutlineEdit />
                      </Link>
                      <button className='hover:text-sky-400 transition-colors p-2' onClick={() => deleteCustomer(data.id, data.name)}>
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

export default Customer;