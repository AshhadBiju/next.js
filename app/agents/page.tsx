import React from 'react'

interface User {
  id:number;
  name:string;
  email: string;
}

const agents = async () => {
const res = await fetch('https://jsonplaceholder.typicode.com/users',{cache: 'no-store'}) //fetch gives a promise so use const res = await
console.log(res);

const users : User[] = await res.json();
  return (
    <div>
      <button className=' bg-sky-600 text-black p-2 rounded-lg absolute top-4 right-40 hover:text-white transition-colors'>Create Agents</button>
      <h1 className='absolute top-14 left-40'>Our agents who are out there everyday making our company grow</h1>
      <div>
      <table className='table table-zebra absolute top-24 left-40'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
    {users.map(user => <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
       </tr>)}
    </tbody>
       </table>
      </div>
    </div>
    )

}

export default agents
