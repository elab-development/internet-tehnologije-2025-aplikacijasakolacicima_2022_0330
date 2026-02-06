import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigacija - prikazuje se na svim stranicama */}
        <Navbar />
        
        {/* Glavni sadržaj */}
        <main className="main-content">
          <Routes>
            {/* Početna stranica */}
            <Route path="/" element={<Home />} />
            
            {/* Stranica za login */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        {/* Footer prikazuje se na svim stranicama */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
