'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import Link from 'next/link';

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
              
            </tr>
          </thead>
          <tbody className='text-cyan-900 text-center'>
            {usersData && usersData.map((data) => (
              <tr key={data.id}>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.name}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.email}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.role}</td>
                <td className='py-3 px-6 hover:bg-sky-500 cursor-pointer duration-300 hover:scale-90'>{data.phoneNumber}</td>
               <Link href={`/updateagent?id=${btoa(data.id)}`}  className='hover:text-sky-400 transition-colors p-2'><AiOutlineEdit /></Link>

                <td className='hover:text-sky-400 transition-colors p-2'><MdDeleteOutline /></td>
                
              </tr>
            ))}   
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agents;
