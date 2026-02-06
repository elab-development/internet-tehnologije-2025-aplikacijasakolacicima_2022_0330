import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx'; 
import Logout from './pages/Logout.tsx'; 


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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/logout-test" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
