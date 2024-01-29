// Import the React library to create React components
import React from 'react';

// Import necessary hooks and components from 'react'
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext'; 
import { useUser } from '../UserContext'; 

// Import Navigate from 'react-router-dom' for navigation
import { Link, Navigate, useParams } from 'react-router-dom'; 
// to extract the params from the URL
// to link the page to other pages

import axios from 'axios';
// for handling requests

import PlacesPage from './PlacesPage';
import IndexPage from './IndexPage';
import AccountNav from './AccountNav'
// places details- we made a separate page for that

// Define and export a functional component named AccountPage
export default function AccountPage() {
  // Define state variable 'redirect' and 'setRedirect' function using useState hook
  const [redirect, setRedirect] = useState(null);
  // for redirecting after logout (can be used for many use cases)

  // Extract 'subpage' from URL parameters using useParams hook from react-router-dom
  let { subpage } = useParams();
  // get the URL parameters

  // Use the useUser hook to access user-related context from UserContext
  const { user, ready, setUser } = useUser();

  // If user data is not ready, display a loading indicator (shimmer)
  if (!ready) {
    return (<div>Shimmer...</div>);
  }

  // Define an asynchronous function named logout to handle user logout
  async function logout() {
    try {
      // Attempt to send a POST request to the '/logout' endpoint using axios
      await axios.post('/logout');

      // Clear the 'token' cookie by setting its expiration to a past date
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Set the redirect state to '/' to navigate to the specified path after logout
      setRedirect('/');

      // Set the user context state to null, effectively logging the user out
      setUser(null);
    } catch (error) {
      // If an error occurs during the logout process, log the error to the console
      console.error('Logout error:', error);
    }
  }

  // If user data is ready but the user is not logged in, redirect to the login page
  if (ready && !user && !redirect) {
    return (
      <Navigate to={'/login'}/>
    );
  }

  // Set default value for 'subpage' if it's undefined
  if (subpage === undefined) {
    subpage = 'profile';
  }



  // If redirect is set, navigate to the specified path
  if (redirect) {
    <Navigate to={redirect}/>
  }

  // If the user is logged in, display the account page with the username
  return (
    <>
      <div className="flex flex-col pt-4 h-screen">
        <AccountNav/>        
        {/* Render content based on the current 'subpage' */}
        {subpage === 'profile' && user && (
          <div className="">
            <p className="text-xl font-bold mb-4">
              Logged in as {user.username} ({user.email})
            </p>
            <button className="primary py-2 px-4 rounded-full items-center" onClick={logout}>Logout</button>
          </div>
        )}
        {subpage === 'places' && (
          <div>
            <PlacesPage />
          </div>
        )}      
      </div>
    </>
  );
}




