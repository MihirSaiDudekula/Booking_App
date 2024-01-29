// Import the React library to create React components
import React from 'react';
import { Link, useParams } from 'react-router-dom';
// to link the page to other pages


//created a new component, that holds the form seperately
import PlacesFormPage from './PlacesFormPage';
import AccountNav from './AccountNav'

// Define and export a functional component named PlacesPage, rendered in AccountPage
export default function PlacesPage() {

  // we obtain the sub params of the URL
  return (
    <>
      <AccountNav/>
      <div>
        <div className="text-center">
          <Link className='inline-flex gap-1 bg-customPink text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      </div>

{/*      {action === 'new' && (
        <PlacesFormPage/>
      )}*/}
    </>
  );
}


