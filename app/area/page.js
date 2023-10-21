
import React from 'react';
import 'tailwindcss/tailwind.css';
const plans = async () => {
  const res = await fetch('http://localhost:3001/api/area/getall', { cache: 'no-store' }); // fetch gives a promise, so use const res = await
  console.log(res);//table table-zebra absolute top-24 left-40

  const area  = await res.json();

  return (
    <div>
      <button className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create plans</button>
      <h1 className='absolute top-14 left-40'>Plans</h1>
      <div>
        <table className='table-column-group absolute top-24 left-40 min-w-full divide-y divide-gray-200 border'> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {area&&area.area.map((data) => (
              <tr key={data.id}>
                <td>{data.city}</td>
                <td>{data.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default plans;

