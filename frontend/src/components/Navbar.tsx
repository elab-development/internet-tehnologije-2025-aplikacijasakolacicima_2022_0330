import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect } from "react";
import api from "../axios";

interface User {
    id: number;
    name: string;
    email: string;
}

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        api.get("/user", { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/logout", {}, { withCredentials: true });

            localStorage.clear();
            setUser(null);

            window.location.href = "/";
        } catch (err: any) {
            console.error(
                "Greška pri odjavi:",
                err.response?.data || err.message,
            );
            localStorage.clear();
            setUser(null);
            window.location.href = "/login";
        }
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
                    className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigacija */}
                <div className={`navbar-content ${isMenuOpen ? "active" : ""}`}>
                    <ul className="navbar-menu">
                        <li>
                            <Link
                                to="/"
                                className={
                                    location.pathname === "/" ? "active" : ""
                                }
                                onClick={closeMenu}
                            >
                                Početna
                            </Link>
                        </li>
                    </ul>

                    {/* Login dugme */}
                    <div className="navbar-auth">
                        {user ? (
                            <div className="user-dropdown">
                                <span className="user-name">
                                    Dobrodošli, <span className="user">{user.name}</span>
                                </span>
                                <div className="dropdown-content">
                                    <button
                                        onClick={handleLogout}
                                        className="btn-logout"
                                    >
                                        Odjava
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`btn-login ${location.pathname === "/login" ? "active" : ""}`}
                                onClick={closeMenu}
                            >
                                Prijava
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
