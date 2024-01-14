// Import necessary dependencies from the 'react' library
import React from 'react';
import Header from './Header';  // Import the Header component
import { Outlet } from 'react-router-dom';  // Import the Outlet component from 'react-router-dom'

// Define and export the functional component Layout
export default function Layout() {
  // Render the main structure of the application layout
  return (
    // Flex container with column direction and full height
    <div className="flex flex-col h-screen">
      {/* Render the Header component */}
      <Header />
      {/* Flex container that grows to fill available space with padding, centered content */}
      {/*<div className="flex-grow p-4 flex justify-center items-center">*/}
      <div className="flex-grow p-3 flex">
        {/* Render the child components defined by the routes using Outlet */}
        <Outlet />
      </div>
    </div>
  );
}
