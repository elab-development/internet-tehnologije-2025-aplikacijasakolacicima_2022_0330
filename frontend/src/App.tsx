import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx'; 

function App() {

  useEffect(() => {
    const checkUser = async () => {
        try {
            const res = await axios.get('/api/user');
            console.log("Korisnik je ulogovan:", res.data.user);
        } catch (err) {
            console.log("Korisnik nije ulogovan");
            localStorage.removeItem('user_name');
        }
    };
    checkUser();
}, []);

  return (
  <Router>
    <Navbar />
      <Routes>
        {/* Početna stranica */}
        <Route path="/" element={<Home />} />
        
        {/* Stranica za login */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

