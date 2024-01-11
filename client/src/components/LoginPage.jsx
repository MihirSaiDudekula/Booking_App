import React from 'react';
import { useContext, useState }  from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useUser } from '../UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post('/login', {
        email,
        password,
      });
      setUser(data); 
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login Failed. Please refresh the page and try again');
      console.error(e);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <header className="text-4xl mb-4">Login</header>
      <form className="max-w-md w-full mx-auto space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-2 rounded-md bg-primary text-white">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?
          <Link to="/register" className="px-1 underline text-black">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
