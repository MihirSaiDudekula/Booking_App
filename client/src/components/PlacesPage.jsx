// Import the React library to create React components
import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
// to link the page to other pages

import axios from 'axios';
// for handling requests

//created a new component, that holds the form seperately
import PlacesFormPage from './PlacesFormPage';
import AccountNav from './AccountNav'

// Define and export a functional component named PlacesPage, rendered in AccountPage
export default function PlacesPage() {
  // Define a state variable 'places' using the useState hook
  const [places, setPlaces] = useState([]);
  
  // useEffect hook to perform side effects in function components
  // This hook is used to fetch data from the server when the component mounts
  useEffect(() => {
    // Define an asynchronous function 'getPlaces' to fetch places data from the server
    async function getPlaces() {
      // Send a GET request to '/places' endpoint using axios to fetch places data
      const { data } = await axios.get('/places');

      // Update the 'places' state with the fetched data
      setPlaces(data);
    }

    // Call the 'getPlaces' function when the component mounts (empty dependency array)
    getPlaces();
  }, []);


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
      <div className='mt-4'>
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places'+place._id} className="flex cursor-pointer gap-4 bg-gray-200 p-2 rounded-2xl" key={place._id}>
            <div className="w-32 h-32 bg-gray-300 shrink-0">
              {console.log(place.photos[0])}
              {/* Use conditional rendering to display the image */}
              {place.photos.length > 0 && (
                <img src={place.photos[0]} alt={place.title} />
              )}
            </div>
            <div>
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>

    </>
  );
}


