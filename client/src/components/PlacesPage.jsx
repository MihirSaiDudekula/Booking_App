// Import the React library to create React components
import React from 'react'

import { useContext, useState } from 'react';

import axios from 'axios';
// for handling requests

import { Link,useParams } from 'react-router-dom'; 
// to link the page to other pages

import Perks from './Perks'

// Define and export a functional component named PlacesPage, rendered in AccountPage
export default function PlacesPage()
{
  // const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [photoLink,setPhotoLink] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  const {action} = useParams();

  function inputHeader(text)
  {
    return(
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }


  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    try {
      const { data: { message, filename } } = await axios.post('/upload-by-link', { link: photoLink });
      setAddedPhotos(prev => [...prev, filename]);
      setPhotoLink('');
      // Handle success or show a message if needed
      console.log(message);
    } catch (error) {
      console.error('Error uploading photo:', error);
      // Handle error (display an error message or take appropriate action)
    }
  }

  // we obtain the sub params of the URL
    return (
      <>
        {action !== 'new' && (
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
        )}
        {action === 'new' && (
          <div>
            <form action="">
              {preInput('Title','Title for your place. Should be short and catchy')}
              <input className="" type="text" placeholder="title,for example:My lovely apartment" value={title} onChange={ev=>setTitle(ev.target.value)}/>
              {preInput('Address','Exact address of this location')}
              <input className="" type="text" placeholder="address" value={address} onChange={ev=>setAddress(ev.target.value)} />
              {preInput('Photos','The more, the better')}
              <div className='flex'>
                <input type="text" placeholder="Add using a link" value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)}/>
                <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;Photo</button>
              </div>
              <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link, index) => (
                    <div key={index}><img className='rounded-2xl' src={`http://localhost:3000/uploads/${link}`} alt=""/></div>
                  ))}
                <button className='flex items-center border bg-transparent rounded-2xl p-4 text-gray-600'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                Upload from your device
                </button>            
              </div>
              {preInput('Description','description of the place')}
              <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
              {preInput('Perks','select all the perks of your place')}
              <div>
                 <Perks selected={perks} onChange={setPerks}/>
                 {preInput('Extra Information','Anything else to specify')}
                 <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
                 {preInput('Check in and out times, max guests','Time windows for guests Check-in and out and cleaning in between')}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                  <div>
                    <h3 className="mt-2 -mb-1">Check-In time</h3>
                    <input type="text" placeholder="16:00" value={checkIn} onChange={ev=>setCheckInInfo(ev.target.value)} />
                  </div>
                  <div>
                    <h3 className="mt-2 -mb-1">Check-Out time</h3>
                    <input type="text" placeholder="19:00" value={checkOut} onChange={ev=>setCheckOutInfo(ev.target.value)}/>
                  </div>
                  <div>
                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                    <input type="number" placeholder="5" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}/>
                  </div>
                </div>
              <div>
                <button className="primary my-4">Save</button>
              </div> 
            </form>
            </div>
        )}
      </>
    );
}


