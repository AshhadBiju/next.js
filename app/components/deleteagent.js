'use client'
import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = () => {
    // Send a DELETE request to your API to delete the user by ID
    axios
      .delete(`http://localhost:3001/api/users/${userId}`)
      .then((response) => {
        setMessage('User deleted successfully');
      })
      .catch((error) => {
        setMessage('Error deleting user');
      });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Delete User
      </button>
      <p className="mt-2 text-red-700">{message}</p>
    </div>
  );
};

export default DeleteUser;
