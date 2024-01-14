// Import necessary dependencies from the 'react' library
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
 // Import Link and Navigate from 'react-router-dom' for navigation
import axios from 'axios'; 
// Import axios for making HTTP requests
import { UserContext } from '../UserContext'; 
// Import UserContext to access user-related context
import { useUser } from '../UserContext'; 
// Import useUser hook from UserContext for user-related functionality

// Define and export the functional component LoginPage
export default function LoginPage() {
  // Declare state variables using the useState hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Use the useContext hook to access the UserContext and retrieve setUser function
  // const { setUser } = useContext(UserContext);
  const { setUser } = useUser();

  // Define an asynchronous function handleLogin triggered on form submission
  async function handleLogin(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the '/login' endpoint with email and password
      const { data } = await axios.post('/login', {
        email,
        password,
      });

      // Set the user data in the context using the setUser function
      setUser(data);
      alert('Login successful'); // Display a success alert
      setRedirect(true); // Set the redirect state to true
    } catch (e) {
      alert('Login Failed. Please refresh the page and try again'); // Display an error alert
      console.error(e); // Log the error to the console
    }
  }

  // Redirect to the home page if the redirect state is true
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  // Render the login form and UI
  return (
    <div className="flex-grow p-4 flex justify-center place-items-center items-center">
      <div className="flex flex-col items-center justify-center h-full">
        <header className="text-4xl mb-4">Login</header>
        {/* Create a form with input fields, a button, and a link to the registration page */}
        <form className="max-w-md w-full mx-auto space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />
          <button className="w-full py-2 rounded-md bg-primary text-white">Login</button>
          {/* Display a link to the registration page */}
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to="/register" className="px-1 underline text-black">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
