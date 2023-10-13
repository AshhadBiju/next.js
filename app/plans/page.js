"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define the URL of your backend API
    const apiUrl = 'http://localhost:6000/api/area/getall';

    // Fetch data from the API when the component mounts
    axios.get(apiUrl)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.city}</li>
  
        ))} 
      </ul>
    </div>
  );
}
export default HomePage;
