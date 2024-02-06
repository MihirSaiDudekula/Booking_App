import { useContext, useEffect, useState } from "react"; // Importing necessary hooks from React
import { differenceInCalendarDays } from "date-fns"; // Importing function for calculating the difference between calendar days from date-fns library
import axios from "axios"; // Importing Axios for making HTTP requests
import { Navigate } from "react-router-dom"; // Importing Navigate component from react-router-dom for programmatic navigation
import { UserContext } from "./UserContext.jsx"; // Importing UserContext for accessing user data

// Functional component 'BookingWidget' that takes 'place' as a prop
export default function BookingWidget({ place }) {
  // State variables to manage input fields and redirection
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext); // Accessing user data from the UserContext

  // Effect hook to update the name if user context changes
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Variable to calculate the number of nights based on check-in and check-out dates
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  // Function to book the place
  async function bookThisPlace() {
    // Sending a POST request to '/bookings' endpoint with booking data
    const response = await axios.post('/bookings', {
      checkIn, checkOut, numberOfGuests, name, phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    // Extracting the booking ID from the response data
    const bookingId = response.data._id;
    // Redirecting to the bookings page for the newly created booking
    setRedirect(`/account/bookings/${bookingId}`);
  }

  // Redirecting to the bookings page if 'redirect' state is set
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // JSX markup for displaying booking widget
  return (
    <div className="bg-white shadow p-4 rounded-2xl"> {/* Booking widget container */}
      <div className="text-2xl text-center"> {/* Price display */}
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4"> {/* Form container */}
        <div className="flex"> {/* Check-in and Check-out inputs */}
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
          </div>
        </div>
        <div className="py-3 px-4 border-t"> {/* Number of guests input */}
          <label>Number of guests:</label>
          <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>
        {/* Additional inputs for name and phone number if number of nights is greater than 0 */}
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
          </div>
        )}
      </div>
      {/* Button to book the place */}
      <button onClick={bookThisPlace} className="primary mt-4"> {/* Primary button style */}
        Book this place
        {/* Displaying total price if number of nights is greater than 0 */}
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
