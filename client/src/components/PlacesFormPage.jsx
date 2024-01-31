import { useState,useEffect } from 'react';
import { Link,useParams, Navigate } from 'react-router-dom';

import axios from 'axios';
// for handling requests

import PhotosUploader from './PhotosUploader';
import Perks from './Perks';
import AccountNav from './AccountNav'

export default function PlacesFormPage()
{
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
      // Check if the 'id' variable is falsy (e.g., null, undefined, 0)
      if (!id) {
        // If 'id' is falsy, return early from the effect without performing any further actions
        return;
      }

      // If 'id' is truthy, make an asynchronous GET request using Axios to fetch place data
      axios.get('/places/'+id).then(response => {
             const {data} = response;
             console.log(data)
             setTitle(data.title);
             setAddress(data.address);
             setAddedPhotos(data.photos);
             setDescription(data.description);
             setPerks(data.perks);
             setExtraInfo(data.extraInfo);
             setCheckIn(data.checkIn);
             setCheckOut(data.checkOut);
             setMaxGuests(data.maxGuests);
          });
    }, [id]); // Specify 'id' as a dependency for this effect


  // Function to create and return an h2 element with specified text
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  // Function to create and return a paragraph element with specified text
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  // Function to create a container with a header and description using inputHeader and inputDescription functions
  function preInput(header, description) {
    return (
      <>
        {/* Render the header using inputHeader function */}
        {inputHeader(header)}
        {/* Render the description using inputDescription function */}
        {inputDescription(description)}
      </>
    );
  }

  // function is responsible for handling the form submission.
  async function addNewPlace(e){
    e.preventDefault();
    // prevents the default behavior of the form submission, which is to reload the page
    const placeData = {title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuests}
    // creates an object named placeData containing data from various form fields 
    await axios.post('/places',placeData)
    // asynchronous POST request to the server endpoint /places with the placeData object as the payload. It's sending the new place details to be saved on the server/database.
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return(
      <>
      <AccountNav/>
      <div>
        <form onSubmit={addNewPlace}>
          {//when the form is submitted, the addNewPlace function will be called to handle the submission
          }
          {preInput('Title', 'Title for your place. Should be short and catchy')}
          <input className="" type="text" placeholder="title,for example:My lovely apartment" value={title} onChange={(ev) => setTitle(ev.target.value)} />
          {preInput('Address', 'Exact address of this location')}
          <input className="" type="text" placeholder="address" value={address} onChange={(ev) => setAddress(ev.target.value)} />
          {preInput('Photos', 'The more, the better')}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput('Description', 'description of the place')}
          <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />
          {preInput('Perks', 'select all the perks of your place')}
          <div>
            <Perks selected={perks} onChange={setPerks} />
            {preInput('Extra Information', 'Anything else to specify')}
            <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />
            {preInput('Check in and out times, max guests', 'Time windows for guests Check-in and out and cleaning in between')}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check-In time</h3>
              <input type="time" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check-Out time</h3>
              <input type="time" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input type="number" placeholder="5" value={maxGuests} onChange={(ev) => setMaxGuests(ev.target.value)} />
            </div>
          </div>
          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
      </>
    )
}
