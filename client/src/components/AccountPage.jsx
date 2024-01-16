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

import PlacesPage from './PlacesPage';
import IndexPage from './IndexPage';
//places details- we made a seperate page for that

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
    let classes = 'inline-flex gap-1 py-2 px-6 text-white rounded-full transition-all duration-300';

    // Check if the 'type' matches the current subpage or if subpage is undefined and 'type' is 'profile'
    if (type === subpage) {
      classes += ' bg-customPink hover:bg-customPinkDark';
    } else {
      classes += ' bg-gray-500 hover:bg-gray-800';
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
      <div className="flex flex-col pt-4 h-screen">
        <nav className="flex gap-4 mb-8 items-center">
          {/* Link to the 'My Profile' page with dynamically determined classes based on 'linkClasses' function */}
          <Link className={linkClasses('profile')} to={'/account/'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
            My Profile
          </Link>

          {/* Link to the 'My Bookings' page with dynamically determined classes based on 'linkClasses' function */}
          <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
            My Bookings
          </Link>

          {/* Link to the 'My Accommodations' page with dynamically determined classes based on 'linkClasses' function */}
          <Link className={linkClasses('places')} to={'/account/places'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>
            My Accommodations
          </Link>
        </nav>
        {/*{console.log(subpage)}*/}
        {/*rendering for the default local page*/}
        {subpage === 'profile' && user &&(
          <div className="">
            <p className="text-xl font-bold mb-4">
              Logged in as {user.username} ({user.email})
            </p>
            <button className="primary py-2 px-4 rounded-full items-center" 
            onClick={logout}>Logout</button>
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




