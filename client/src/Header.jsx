import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom' for navigation
import { useContext, useState } from 'react'; // Import useContext and useState from 'react'
import { UserContext } from './UserContext';
import { useUser } from './UserContext'; // Import UserContext to access user-related context

// Define and export the functional component Header
export default function Header() {
  // Use the useContext hook to access the UserContext and retrieve the user object
  const { user } = useUser();

  // Render the header section of the application
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300">
      {/* Link to the home page with AirBnB logo and title */}
      <Link to="/" className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className="font-bold text-xl">AirBnB</span>
      </Link>
      {/* Search and filter options with a button for adding guests */}
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-200">
        <div>Anywhere </div>
        <div className="border-l border-gray-300"></div>
        <div>Any week </div>
        <div className="border-l border-gray-300"></div>
        <div>Add guests</div>
        <button className="p-1.5 rounded-full bg-primary text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
      {/* User authentication and profile information */}
      <div className="flex gap-2 items-center">
        {/* Icon for navigation or menu */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {/* Link to the login page with authentication status and user name */}
        {/*!!user is a shorthand in JavaScript for converting a value to its boolean equivalent.!!user: The second ! negates the result of the first !, effectively converting it back to the original truthiness of user*/}
        {/*here, we conditionally render the user logo on the top right corner depending uon wether the user has logged in or not. also, the same component redirects to different routes depending upon the login state*/}
        {!!user ? (
          <Link to="/account">
            <div className="flex items-center">
              <div className="bg-customPink rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2">{user.username}</div>
            </div>
          </Link>
        ) : (
          // Render alternative content when the user is not authenticated
          <Link to="/login">
            <div className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}