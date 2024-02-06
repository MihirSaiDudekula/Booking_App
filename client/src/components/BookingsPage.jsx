import AccountNav from "./AccountNav"; // Importing AccountNav component
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import axios from "axios"; // Importing Axios for making HTTP requests
import PlaceImg from "../PlaceImg"; // Importing PlaceImg component
import { differenceInCalendarDays, format } from "date-fns"; // Importing functions from date-fns library
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import BookingDates from "../BookingDates"; // Importing BookingDates component

// Functional component 'BookingsPage'
export default function BookingsPage() {
  const [bookings, setBookings] = useState([]); // State variable to store bookings data

  // Effect hook to fetch bookings data
  useEffect(() => {
    axios.get('/bookings').then(response => {
      // Setting the bookings data in the state
      setBookings(response.data);
    });
  }, []);

  // JSX markup to render the component
  return (
    <div> {/* Container for BookingsPage */}
      <AccountNav /> {/* Rendering AccountNav component */}
      <div> {/* Container for bookings */}
        {/* Mapping through bookings and rendering booking details */}
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"> {/* Link to booking details page */}
            <div className="w-48"> {/* Container for place image */}
              <PlaceImg place={booking.place} /> {/* Rendering PlaceImg component with place data */}
            </div>
            <div className="py-3 pr-3 grow"> {/* Container for booking details */}
              <h2 className="text-xl">{booking.place.title}</h2> {/* Displaying place title */}
              <div className="text-xl"> {/* Container for booking information */}
                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" /> {/* Rendering BookingDates component with booking data */}
                <div className="flex gap-1"> {/* Container for total price */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"> {/* Icon for total price */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /> {/* Path for total price icon */}
                  </svg>
                  <span className="text-2xl"> {/* Displaying total price */}
                    Total price: ${booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
