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

// Define and export a functional component named AccountPage
export default function AccountPage() {
  const {subpage} = useParams();
  //get the URL parameters
  // Use the useUser hook to access user-related context
  const { user, ready } = useUser();

  // If user data is not ready, display a loading indicator (shimmer)
  if (!ready) {
    return (<div>Shimmer...</div>);
  }

  // If user data is ready but the user is not logged in, redirect to the login page
  if (ready && !user) {
    return (
      <Navigate to={'/login'}/>
    );
  }

  
  // Function to determine the classes for styling links based on the given 'type'
  function linkClasses(type = null) {
    // Initialize with default classes for padding
    let classes = 'py-2 px-6';

    // Check if the 'type' matches the current subpage or if subpage is undefined and 'type' is 'profile'
    if (type === subpage || (subpage === undefined && type === 'profile')) {
      // Add additional classes for custom styling when there is a match
      classes += ' bg-customPink text-white rounded-full';
    }

    // Return the generated classes
    return classes;
  }

  // If the user is logged in, display the account page with the username
  return (
    <>
      <div>
        <nav className="w-full gap-2">
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
      </div>
    </>
  );
}

