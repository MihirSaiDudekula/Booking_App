import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Layout from './Layout'
import './App.css';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:3000';

function App() {
  return (
    <Router> 
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
