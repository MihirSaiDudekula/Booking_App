// Import necessary dependencies from React and Axios
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for managing user data across components
export const UserContext = createContext({});

// Define a provider component to manage user data and make it accessible to its children
export function UserContextProvider({ children }) {
  // State to hold user information, initialized as null
  const [user, setUser] = useState(null);

  // Use useEffect to fetch user data when the component mounts or when user changes
  useEffect(() => {
    // Define an asynchronous function to fetch user data
    const fetchData = async () => {
      try {
        // Check if user data is not already present in the state
        if (!user) {
          // Send a GET request to the '/profile' endpoint on the server
          // withCredentials: true enables sending cookies with the request
          const response = await axios.get('/profile', { withCredentials: true });
          
          // Extract user data from the response
          const userData = response.data;
          
          // Set user data in the component's state
          setUser(userData);
        }
      } catch (error) {
        // Log any errors that occur during the data fetching process
        console.error(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [user]); // Depend on 'user' to re-run the effect when 'user' changes

  // Provide the user data and setUser function to its children components through the context
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Render children components */}
    </UserContext.Provider>
  );
}

// Custom hook to conveniently access the user context in functional components
export function useUser() {
  return useContext(UserContext);
}
