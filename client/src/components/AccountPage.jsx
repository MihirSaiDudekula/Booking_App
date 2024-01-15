// Import the React library to create React components
import React from 'react';

// Import necessary hooks and components from 'react'
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext'; 
import { useUser } from '../UserContext'; 

// Import Navigate from 'react-router-dom' for navigation
import { Link,Navigate,useParams } from 'react-router-dom'; 
//to extract the params from the URL
// to link the page to other pages

import axios from 'axios';
// for handling requests

// Define and export a functional component named AccountPage
export default function AccountPage() {
  const [redirect,setRedirect]=useState(null)
  // for redirecting after logout (can be used for many use cases)
  let {subpage} = useParams();
  //get the URL parameters
  // Use the useUser hook to access user-related context
  const { user, ready,setUser } = useUser();

  // If user data is not ready, display a loading indicator (shimmer)
  if (!ready) {
    return (<div>Shimmer...</div>);
  }

  // to deal with the logout functionality
  // Define an asynchronous function named logout
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

  if(subpage===undefined)
  {
    subpage='profile'
  }

  // Function to determine the classes for styling links based on the given 'type'
  function linkClasses(type = null) {
    // Initialize with default classes for padding
    let classes = 'py-2 px-6 text-white rounded-full transition-all duration-300';

    // Check if the 'type' matches the current subpage or if subpage is undefined and 'type' is 'profile'
    if (type === subpage) {
      classes += ' bg-customPink hover:bg-customPinkDark';
    } else {
      classes += ' bg-gray-700 hover:bg-gray-800';
    }

    // Return the generated classes
    return classes;
  }

  if(redirect)
  {
    <Navigate to={redirect}/>
  }

   // If the user is logged in, display the account page with the username
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <nav className="flex gap-4 mb-8">
          {/* Link to the 'My Profile' page with dynamically determined classes based on 'linkClasses' function */}
          <Link className={linkClasses('profile')} to={'/account/'}>
            My Profile
          </Link>

          {/* Link to the 'My Bookings' page with dynamically determined classes based on 'linkClasses' function */}
          <Link className={linkClasses('bookings')} to={'/account/bookings'}>
            My Bookings
          </Link>

          {/* Link to the 'My Accommodations' page with dynamically determined classes based on 'linkClasses' function */}
          <Link className={linkClasses('places')} to={'/account/places'}>
            My Accommodations
          </Link>
        </nav>
        {/*rendering for the default local page*/}
        {subpage === 'profile' && user &&(
          <div className="">
            <p className="text-xl font-bold mb-4">
              Logged in as {user.username} ({user.email})
            </p>
            <button className="primary py-2 px-4 rounded-full" 
            onClick={logout}>Logout</button>
          </div>
        )}      
        </div>
    </>
  );
}




