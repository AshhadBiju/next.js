'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

const Plans = () => {
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/plans', { headers: { 'Cache-Control': 'no-store' } });
        console.log(response);
        setPlansData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <button className='bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create plans</button>
      <h1 className='absolute top-14 left-40'>Plans</h1>
      <div>
        <table className='table-column-group absolute top-24 left-40 min-w-full divide-y divide-gray-200 border'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th> {/* Changed from Email to Price */}
            </tr>
          </thead>
          <tbody>
            {plansData && plansData.map((data) => (
              <tr key={data.id}>
                <td>{data.planName}</td>
                <td>{data.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Plans;
