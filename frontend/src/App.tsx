import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import VehicleDetails from './pages/VehicleDetails';

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx'; 
import Statistics from './pages/Statistics.tsx';
import Forbidden from './pages/Forbidden.tsx';

export function App() {

  const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const checkUser = async () => {
//         try {
//             const res = await axios.get('/api/user');
//             console.log("Korisnik je ulogovan:", res.data.user);
//         } catch (err) {
//             console.log("Korisnik nije ulogovan");
//             localStorage.removeItem('user_name');
//         }
//     };
//     checkUser();
// }, []);

  useEffect(() => {
    axios.get('/api/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
  <Router>
    <div className="app-container">
    <Navbar />
    <div className="main-content">
      <Routes>
        <Route path="/403" element={<Forbidden />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vehicles/:id" element={ user!=null? <VehicleDetails /> : <Navigate to ="/403"/>} />
        <Route 
        path="/statistics" 
        element={ user?.role === "admin" 
                  ? <Statistics /> 
                  : <Navigate to="/403" />
              }  
          />
      </Routes>
      </div>
      <Footer />
      </div>
    </Router>
  );
}

export default App;