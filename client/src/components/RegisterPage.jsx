import React from 'react';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function RegisterPage() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  function registerUser(e) {
    e.preventDefault();

    axios.post('/register',{
      username,
      email,
      password
    })
      .then(response => {
        console.log('Successful request');
        // Do something with the response if needed
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error if the request fails
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <header className="text-4xl mb-4">Register</header>
      <form className="max-w-md w-full mx-auto space-y-4" onSubmit={registerUser}>
        <input type="username" placeholder="Username" className="w-full border p-2 rounded-md" 
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
        <input type="email" placeholder="Email" className="w-full border p-2 rounded-md" 
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded-md" 
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="w-full py-2 rounded-md bg-primary text-white">
          Register
        </button>
        <div className="text-center py-2 text-gray-500">
        Already a member? 
        <Link to="/login" className="px-1 underline text-black">Login</Link></div>
      </form>
    </div>
  );
}
