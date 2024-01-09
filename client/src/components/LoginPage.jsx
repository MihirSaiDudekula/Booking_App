import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <header className="text-4xl mb-4">Login</header>
      <form className="max-w-md w-full mx-auto space-y-4">
        <input type="email" placeholder="Email" className="w-full border p-2 rounded-md" />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded-md" />
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
