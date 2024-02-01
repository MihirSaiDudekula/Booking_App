// import axios from "axios";
// import {useState} from "react";
// // for handling requests

// export default function PhotosUploader({ addedPhotos, onChange }) {
//   // Define state variable 'photoLink' and its setter function using useState hook
//   const [photoLink, setPhotoLink] = useState('');

//   // Define an asynchronous function named addPhotoByLink to upload photo by link
//   async function addPhotoByLink(e) {
//     // Prevent the default behavior of the event (e.g., form submission)
//     e.preventDefault();

//     try {
//       // Send a POST request to '/upload-by-link' endpoint using axios
//       const { data: { message, filename } } = await axios.post('/upload-by-link', { link: photoLink });

//       // Update state with the newly added filename
//       onChange((prev) => [...prev, filename]);

//       // Clear the photoLink state variable
//       setPhotoLink('');

//       // Log the success message received from the server
//       console.log(message);
//     } catch (error) {
//       // Log an error message if there's an issue with the asynchronous operation
//       console.error('Error uploading photo:', error);
//       // Handle error (display an error message or take appropriate action)
//     }
//   }

//   // Define an asynchronous function named uploadPhoto to upload photo by selecting files
//   async function uploadPhoto(e) {
//     // Extract the selected files from the event target
//     const files = e.target.files;

//     // Create a new FormData object to handle multipart/form-data for file uploads
//     const data = new FormData();

//     // Loop through each selected file and append it to the FormData object with key 'photos'
//     for (let i = 0; i < files.length; i++) {
//       data.append('photos', files[i]);
//     }

//     try {
//       // Send a POST request to '/upload' endpoint with the FormData containing the files
//       const { data: { message, filenames } } = await axios.post('/upload', data, {
//         // Set the headers to indicate multipart/form-data
//         headers: { 'Content-type': 'multipart/form-data' },
//       });

//       // Update state with the newly added filenames
//       onChange((prev) => [...prev, ...filenames]);

//       // Log the success message received from the server
//       // console.log(message);
//     } catch (error) {
//       // Log an error message if there's an issue with the asynchronous operation
//       console.error('Error uploading photo:', error);
//     }
//   }

//   function removePhoto(e, filename) {
//     // Prevent the default behavior of the event
//     e.preventDefault();

//     // Update the 'addedPhotos' state by removing the specified 'filename' from the array
//     onChange([...addedPhotos.filter(photo => photo !== filename)]);
//   }

//   function selectAsMainPhoto(e, filename) {
//     // Prevent the default behavior of the event
//     e.preventDefault();

//     // Update the 'addedPhotos' state by moving the specified 'filename' to the beginning of the array
//     onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
//   }


//   return(
//     <>
//       <div className='flex'>
//         <input type="text" placeholder="Add using a link" value={photoLink} onChange={(ev) => setPhotoLink(ev.target.value)} />
//         <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;Photo</button>
//       </div>

//       <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//         {addedPhotos.length > 0 &&
//           addedPhotos.map((filename, index) => (
//             <div className="h-32 flex relative" key={index}>
//             <img className='rounded-2xl w-full object-cover' src={`http://localhost:3000/uploads/${filename}`} alt="" />
//             <button onClick={ev => removePhoto(ev,link)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                           </svg>
//                 </button>
//                 <button onClick={ev => selectAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
//                   {link === addedPhotos[0] && (
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                       <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
//                     </svg>
//                   )}
//                   {link !== addedPhotos[0] && (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//                     </svg>
//                   )}
//                 </button>                      
//             </div>
//           ))}
//         <label className='cursor-pointer flex items-center border bg-transparent rounded-2xl p-4 text-gray-600'>
//           <input type="file" multiple className='hidden' onChange={uploadPhoto} />
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
//           </svg>
//           Upload from your device
//         </label>
//     </div>
//     </>
//     )
// }


import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(e) {
    e.preventDefault();

    try {
      const { data: { message, filename } } = await axios.post('/upload-by-link', { link: photoLink });

      onChange((prev) => [...prev, filename]);
      setPhotoLink('');

      console.log(message);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    try {
      const { data: { message, filenames } } = await axios.post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });

      onChange((prev) => [...prev, ...filenames]);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    onChange(addedPhotos.filter(photo => photo !== filename));
  }

  function selectAsMainPhoto(e, filename) {
    e.preventDefault();
    onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
  }

  return (
    <>
      <div className='flex'>
        <input type="text" placeholder="Add using a link" value={photoLink} onChange={(ev) => setPhotoLink(ev.target.value)} />
        <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;Photo</button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((filename, index) => (
            <div className="h-32 flex relative" key={index}>
              <img className='rounded-2xl w-full object-cover' src={`http://localhost:3000/uploads/${filename}`} alt="" />
              <button onClick={ev => removePhoto(ev, filename)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              <button onClick={ev => selectAsMainPhoto(ev, filename)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                {filename === addedPhotos[0] ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                )}
              </button>
            </div>
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
  );
}


