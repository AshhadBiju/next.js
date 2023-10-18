
import React from 'react';
import 'tailwindcss/tailwind.css';
import {AiOutlineEdit} from 'react-icons/ai'
import {MdDeleteOutline} from 'react-icons/md' 
const agents = async () => {
  const res = await fetch('http://localhost:3001/api/users', { cache: 'no-store' }); // fetch gives a promise, so use const res = await
  //console.log(res);//table table-zebra absolute top-24 left-40

  const users = await res.json();


  console.log(users);

  return (
    <div>
      <button className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create Agents</button>
      <h1 className='absolute top-14 left-40'>Our agents who are out there every day making our company grow</h1>
      <div>
        <table className='absolute top-24 left-40 divide-y min-w-fit divide-gray-200 border '> 
          <thead>
            <tr>
              <th className="bg-sky-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
              <th className="bg-sky-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
              </tr>
          </thead>
          <tbody>
             {users?.rows.map((data) => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.email}</td>
               <tr className='hover:text-sky-400 transition-colors  '><AiOutlineEdit/></tr>
               <tr className='hover:text-sky-400 transition-colors '><MdDeleteOutline/></tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default agents;
