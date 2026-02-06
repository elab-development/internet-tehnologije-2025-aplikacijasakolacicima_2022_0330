import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🚗 AutoSalon
        </Link>

        {/* Hamburger dugme za mobilni */}
        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigacija */}
        <div className={`navbar-content ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-menu">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={closeMenu}
              >
                Početna
              </Link>
            </li>
          </ul>

          {/* Login dugme */}
          <div className="navbar-auth">
            <Link 
              to="/login" 
              className={`btn-login ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Prijava
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;