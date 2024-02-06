import { useParams } from "react-router-dom"; // Importing useParams hook from react-router-dom for accessing route parameters
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import axios from "axios"; // Importing Axios for making HTTP requests
import AddressLink from "../AddressLink"; // Importing AddressLink component
import PlaceGallery from "../PlaceGallery"; // Importing PlaceGallery component
import BookingDates from "../BookingDates"; // Importing BookingDates component

// Functional component 'BookingPage'
export default function BookingPage() {
  const { id } = useParams(); // Extracting 'id' parameter from the URL using useParams hook
  const [booking, setBooking] = useState(null); // State variable to store booking data

  // Effect hook to fetch booking data when 'id' changes
  useEffect(() => {
    if (id) {
      // Sending a GET request to '/bookings' endpoint
      axios.get('/bookings').then(response => {
        // Finding the booking with the matching 'id' from the response data
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          // Setting the found booking data in the state
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  // Rendering nothing if booking data is not available yet
  if (!booking) {
    return '';
  }

  // JSX markup to display booking information
  return (
    <div className="my-8"> {/* Container for booking information */}
      <h1 className="text-3xl">{booking.place.title}</h1> {/* Displaying place title */}
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink> {/* Displaying place address */}
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between"> {/* Container for booking details */}
        <div> {/* Container for booking details */}
          <h2 className="text-2xl mb-4">Your booking information:</h2> {/* Subheading for booking details */}
          <BookingDates booking={booking} /> {/* Rendering BookingDates component with booking data */}
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl"> {/* Container for total price */}
          <div>Total price</div> {/* Subheading for total price */}
          <div className="text-3xl">${booking.price}</div> {/* Displaying total price */}
        </div>
      </div>
      <PlaceGallery place={booking.place} /> {/* Rendering PlaceGallery component with place data */}
    </div>
  );
}
