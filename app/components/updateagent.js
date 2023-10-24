'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UpdateUser = () => {
const router = useRouter();
const [decodedId, setDecodedId] = useState(null);
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');



  useEffect(() =>{
    const id = router.query.id;
    // Decode the data.id from the URL
    if (id) {
        try {
          const decodedId = atob(id); // Decode the Base64-encoded id
          setDecodedId(decodedId); // Store the decoded ID in state
          console.log('Decoded data.id:', decodedId);
          
        } catch (error) {
          console.error('Error decoding data.id:', error);
        }
      }
    }, [router.query.id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to your backend to update the user's information
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        body: JSON.stringify({ username, newPassword, phoneNumber, name, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('Error updating user');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error updating user');
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          New Email:
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateUser;
