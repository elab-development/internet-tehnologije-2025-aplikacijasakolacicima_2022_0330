import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const AuthForm = () => {
    const [isRegister, setIsRegister] = useState(false); // State za promenu forme
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const url = isRegister 
            ? 'http://127.0.0.1:8000/api/register' 
            : 'http://127.0.0.1:8000/api/login';

        const data = isRegister 
            ? { name, email, password, password_confirmation: passwordConfirmation }
            : { email, password };

        try {
            const response = await axios.post(url, data);
            
            const token = response.data.access_token;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_name', response.data.user.name);

            alert(isRegister ? 'Uspešna registracija!' : 'Uspešna prijava!');
        } catch (err: any) {
            if (err.response && err.response.data.errors) {
                const firstError = Object.values(err.response.data.errors)[0] as string;
                setError(firstError);
            } else {
                setError(err.response?.data?.message || 'Došlo je do greške.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>{isRegister ? 'Registracija' : 'Prijava'}</h2>
                
                {error && <p className="error-msg">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <input 
                            className="login-input"
                            type="text" 
                            placeholder="Ime" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    )}
                    <input 
                        className="login-input"
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        className="login-input"
                        type="password" 
                        placeholder="Lozinka" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {isRegister && (
                        <input 
                            className="login-input"
                            type="password" 
                            placeholder="Potvrdite lozinku" 
                            value={passwordConfirmation} 
                            onChange={(e) => setPasswordConfirmation(e.target.value)} 
                            required 
                        />
                    )}
                    
                    
                    <button type="submit" className="login-btn">
                        {isRegister ? 'Registruj se' : 'Uloguj se'}
                    </button>
                </form>

                <p className="toggle-text">
                    {isRegister ? 'Već imate nalog?' : 'Nemate nalog?'} 
                    <span onClick={() => { setIsRegister(!isRegister); setError(''); }}>
                        {isRegister ? ' Prijavite se' : ' Registrujte se'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;