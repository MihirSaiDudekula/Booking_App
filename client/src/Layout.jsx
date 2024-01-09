import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
