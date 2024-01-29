// Import necessary dependencies from the 'react' library
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import IndexPage from './components/IndexPage'; 
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'; 
import AccountPage from './components/AccountPage'; 
import PlacesPage from './components/PlacesPage';
import PlacesFormPage from './components/PlacesFormPage';  
import Layout from './Layout'; 
import { UserContextProvider } from './UserContext'; // Import the UserContextProvider from 'UserContext'
import './App.css'; 
import axios from 'axios'; // Import axios for making HTTP requests

// Set the default base URL and enable sending cookies with every request for axios
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

// Define the main App component
function App() {
  // Return the main structure of the application wrapped in UserContextProvider
  return (
    <UserContextProvider>
      {/* Use the BrowserRouter as Router for client-side routing */}
      <Router>
        {/* Define the Routes for different paths */}
        <Routes>
          {/* Define a parent Route with the Layout component as its layout */}
          <Route path="/" element={<Layout />}>
            {/* Nested Routes for different pages */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/" element={<AccountPage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            {/*:subpage can be used for subrouting. it can be extracted by useParams() hook later*/}
            <Route path="/account/:subpage/:action" element={<AccountPage />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

// Export the App component as the default export
export default App;
