import axios from "axios";
import {useState} from "react";
// for handling requests

export default function PhotosUploader({ addedPhotos, onChange }) {
  // Define state variable 'photoLink' and its setter function using useState hook
  const [photoLink, setPhotoLink] = useState('');

  // Define an asynchronous function named addPhotoByLink to upload photo by link
  async function addPhotoByLink(e) {
    // Prevent the default behavior of the event (e.g., form submission)
    e.preventDefault();

    try {
      // Send a POST request to '/upload-by-link' endpoint using axios
      const { data: { message, filename } } = await axios.post('/upload-by-link', { link: photoLink });

      // Update state with the newly added filename
      onChange((prev) => [...prev, filename]);

      // Clear the photoLink state variable
      setPhotoLink('');

      // Log the success message received from the server
      console.log(message);
    } catch (error) {
      // Log an error message if there's an issue with the asynchronous operation
      console.error('Error uploading photo:', error);
      // Handle error (display an error message or take appropriate action)
    }
  }

  // Define an asynchronous function named uploadPhoto to upload photo by selecting files
  async function uploadPhoto(e) {
    // Extract the selected files from the event target
    const files = e.target.files;

    // Create a new FormData object to handle multipart/form-data for file uploads
    const data = new FormData();

    // Loop through each selected file and append it to the FormData object with key 'photos'
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    try {
      // Send a POST request to '/upload' endpoint with the FormData containing the files
      const { data: { message, filenames } } = await axios.post('/upload', data, {
        // Set the headers to indicate multipart/form-data
        headers: { 'Content-type': 'multipart/form-data' },
      });

      // Update state with the newly added filenames
      onChange((prev) => [...prev, ...filenames]);

      // Log the success message received from the server
      console.log(message);
    } catch (error) {
      // Log an error message if there's an issue with the asynchronous operation
      console.error('Error uploading photo:', error);
    }
  }
  return(
    <>
      <div className='flex'>
        <input type="text" placeholder="Add using a link" value={photoLink} onChange={(ev) => setPhotoLink(ev.target.value)} />
        <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;Photo</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-">
      {addedPhotos.length > 0 &&
        addedPhotos.map((filename, index) => (
          <div key={index}><img className='rounded-2xl' src={`http://localhost:3000/uploads/${filename}`} alt="" /></div>
        ))}
        <label className='cursor-pointer flex items-center border bg-transparent rounded-2xl p-4 text-gray-600'>
          <input type="file" multiple className='hidden' onChange={uploadPhoto} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
          Upload from your device
        </label>
      </div>
    </>
    )
}




