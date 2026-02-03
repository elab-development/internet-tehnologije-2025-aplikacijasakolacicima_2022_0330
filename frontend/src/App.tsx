import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx'; 

function App() {
  return (
  <Router>
      <Routes>
        {/* Početna stranica */}
        <Route path="/" element={<Home />} />
        
        {/* Stranica za login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
