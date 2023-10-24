'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import deleteUser from '../components/deleteagent'
const Agents = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/getall', { headers: { 'Cache-Control': 'no-store' } });
        setUsersData(response.data.rows);
        localStorage.setItem('dataId', response.data.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id, name) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/users/delete/${id}`);
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
  
 const router = useRouter();
  return (
    <div>
      <Link  href='/createagent'className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create Agents</Link >
      <h1 className='absolute top-5 left-40'>Our agents who are out there every day making our company grow</h1>
      <div className='flex justify-center items-center'>
        <table className='shadow-2xl divide-gray-200 border-2 border-cyan-200 w-6/12 overflow-hidden bg-sky-200'>
          <thead className="text-white">
            <tr>
              <th className="bg-sky-500 py-3 text-white">NAME</th>
              <th className="bg-sky-500 py-3 text-white">EMAIL</th>
              <th className="bg-sky-500 py-3 text-white">ROLE</th>
              <th className="bg-sky-500 py-3 text-white">PHONE NUMBER</th>
              <th className="bg-sky-500 py-3 text-white">ACTIONS</th>
              
            </tr>
          </thead>
          <tbody className='text-cyan-900 text-center'>
            {usersData && usersData.map((data) => (
              <tr key={data.id}>
                
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.name}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.email}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.role}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.phoneNumber}</td>
                <td className='py-3 px-6 hover-bg-sky-500 cursor-pointer duration-300 hover:scale-90'>
                <Link  className='hover:text-sky-400 transition-colors p-2'href={`/agents/update/${data.id}`}> <AiOutlineEdit /></Link>
                <button className='hover:text-sky-400 transition-colors p-2' onClick={() => deleteUser(data.id, data.name)}><MdDeleteOutline /></button>
              </td>
              </tr>//href={`/updateagent?id=${data.id}`}<ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
            ))}   
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agents;

