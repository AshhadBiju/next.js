'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import "tailwindcss/tailwind.css";


const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/collection/getAll', { headers: { 'Cache-Control': 'no-store' } });
        setCollectionData(response.data);
        localStorage.setItem('dataId', response.data.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteCollection = async (id, date,description) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Authorization': `Bearer ${token}`
      }
    };

    const shouldDelete = window.confirm(`Are you sure you want to delete collection ${description}?`);

    if (!shouldDelete) {
      return; 
    }
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/collection/delete/${id}`, 
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

  
 const router = useRouter();


  return (
    <div>
      <Link href='/createCollection' className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create Collection</Link>
      <h1 className='absolute top-5 left-40'>Collection</h1>
      <div className='flex justify-center items-center'>
        <table className='shadow-2xl divide-gray-200 border-2 border-cyan-200 w-6/12 overflow-hidden bg-sky-200'>
          <thead className="text-white">
            <tr>
              
              <th className="bg-sky-500 py-3 text-white">DATE</th>
              <th className="bg-sky-500 py-3 text-white">DESCRIPTION</th>
              <th className="bg-sky-500 py-3 text-white">AMOUNT</th>
              <th className="bg-sky-500 py-3 text-white">ACTIONS</th>
              
            </tr>
          </thead>
          <tbody className='text-cyan-900 text-center'>
            {collectionData && collectionData.map((data) => (
              <tr key={data.id}>
                
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.date}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.description}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.amount}</td>
                <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90'>
                <Link  className='hover:text-sky-400 transition-colors p-2'href={`/updatecollection/${data.id}`}> <AiOutlineEdit /></Link>
                <button className='hover:text-sky-400 transition-colors p-2' onClick={() => deleteCollection(data.id, data.description)}><MdDeleteOutline /></button>
              </td>
              </tr>//href={`/updateagent?id=${data.id}`}<ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
            ))}   
          </tbody>
        </table>
      </div>
      <ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
    </div>
  );
};

export default Collection;
