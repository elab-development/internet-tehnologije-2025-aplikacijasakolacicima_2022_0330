import { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css';
import api from '../axios';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedTheme = getCookie('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        }
    }, []);

    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    };

    const setCookie = (name: string, value: string, days: number = 365) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const applyTheme = (selectedTheme: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', selectedTheme);
    };

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
        setCookie('theme', newTheme);

        try {
            setLoading(true);
            await api.put('/user-preferences', {
                theme: newTheme,
                cookies_accepted: true,
            }, { withCredentials: true });
        } catch (err) {
            console.log('Korisnik nije ulogovan ili je doslo do greske pri cuvanju');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            className={`theme-toggle ${loading ? 'loading' : ''}`}
            onClick={toggleTheme}
            aria-label="Promeni temu"
            disabled={loading}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;