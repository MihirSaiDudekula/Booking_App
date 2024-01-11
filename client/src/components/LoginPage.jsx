import React from 'react';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function LoginPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function handleLogin(e) {
    e.preventDefault();
    try
    {
      await axios.post('/login',{
        email,
        password
      })
      alert('Login succesfull')
    }
    catch(e)
    {
      alert('Login Failed. Please refresh the page and try again')
      console.error(e)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <header className="text-4xl mb-4">Login</header>
      <form className="max-w-md w-full mx-auto space-y-4" 
        onSubmit={handleLogin}>
      <input type="email" placeholder="Email" className="w-full border p-2 rounded-md" 
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />
      <input type="password" placeholder="Password" className="w-full border p-2 rounded-md" 
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
        <button className="w-full py-2 rounded-md bg-primary text-white">
          Login
        </button>
        <div className="text-center py-2 text-gray-500">
        Dont have an account yet? 
        <Link to="/register" className="px-1 underline text-black">Register</Link></div>
      </form>
    </div>
  );
}
