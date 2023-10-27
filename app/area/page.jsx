'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import "tailwindcss/tailwind.css";


const Area = () => {
  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/area/getall', { headers: { 'Cache-Control': 'no-store' } });
        setAreaData(response.data.area);
        localStorage.setItem('dataId', response.data.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteArea = async (id, city) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/area/deletearea/${id}`);
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        // The Area was successfully deleted.
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
  
 const router = useRouter();
  return (
    <div>
      <Link href='/createarea' className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create Area</Link>
      <h1 className='absolute top-5 left-40'>Area</h1>
      <div className='flex justify-center items-center'>
        <table className='shadow-2xl divide-gray-200 border-2 border-cyan-200 w-6/12 overflow-hidden bg-sky-200'>
          <thead className="text-white">
            <tr>
              
              <th className="bg-sky-500 py-3 text-white">CITY</th>
              <th className="bg-sky-500 py-3 text-white">DISTRICT</th>
              <th className="bg-sky-500 py-3 text-white">PINCODE</th>
              <th className="bg-sky-500 py-3 text-white">STATE</th>
              <th className="bg-sky-500 py-3 text-white">ACTIONS</th>
              
            </tr>
          </thead>
          <tbody className='text-cyan-900 text-center'>
            {areaData && areaData.map((data) => (
              <tr key={data.id}>
                
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.city}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.district}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.pincode}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.state}</td>

                <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90'>
                <Link  className='hover:text-sky-400 transition-colors p-2'href={`/updatearea/${data.id}`}> <AiOutlineEdit /></Link>
                <button className='hover:text-sky-400 transition-colors p-2' onClick={() => deleteArea(data.id, data.city)}><MdDeleteOutline /></button>
              </td>
              </tr>//href={`/updateagent?id=${data.id}`}<ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
            ))}   
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Area;