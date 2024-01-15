// Import necessary dependencies from the 'react' library
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
// Import Link from 'react-router-dom' for navigation
import axios from 'axios'; 
// Import axios for making HTTP requests

// Define and export the functional component RegisterPage
export default function RegisterPage() {
  // Declare state variables using the useState hook for username, email, and password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Define an asynchronous function registerUser triggered on form submission
  async function registerUser(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the '/register' endpoint with username, email, and password
      await axios.post('/register', {
        username,
        email,
        password,
      });
      alert('Registration Done successfully'); 
      // Display a success alert
    } catch (e) {
      alert('Registration Failed. Please refresh the page and try again'); // Display an error alert
    }
  }

  // Render the registration form and UI
  return (
    <div className="flex flex-grow p-3 flex-col items-center justify-center h-full">
      <header className="text-4xl mb-4">Register</header>
      {/* Create a form with input fields, a button, and a link to the login page */}
      <form className="max-w-md w-full mx-auto space-y-4" onSubmit={registerUser}>
        {/* Input field for username with onChange event to update the state */}
        <input
          type="username"
          placeholder="Username"
          className="w-full border p-2 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Input field for email with onChange event to update the state */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Input field for password with onChange event to update the state */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded-md"
          value={password}// Set the value of the input field to the 'password' state
          onChange={(e) => setPassword(e.target.value)}
          // Trigger the 'setPassword' function on input change to update the 'password' state
        />
        {/* Button to submit the registration form */}
        <button className="w-full py-2 rounded-md bg-primary text-white">Register</button>
        {/* Display a link to the login page */}
        <div className="text-center py-2 text-gray-500">
          Already a member?
          <Link to="/login" className="px-1 underline text-black">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
