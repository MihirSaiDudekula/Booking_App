import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Layout from './Layout'
import { UserContextProvider } from './UserContext';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL='http://127.0.0.1:3000';
axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider>
      <Router> 
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
