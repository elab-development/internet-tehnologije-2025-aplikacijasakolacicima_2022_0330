import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const AuthForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const [remember, setRemember] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

    try {
        console.log('Uzimam CSRF token...');
        
        //const csrfResponse = await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        //console.log('CSRF Response:', csrfResponse);
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

        const url = isRegister ? '/api/register' : '/api/login';
        const data = isRegister
            ? { name, email, password, password_confirmation: passwordConfirmation }
            : { email, password, remember };

        console.log('Šaljem request za log:', url, data);
        
        await axios.post(url, data, { withCredentials: true });

        alert(isRegister ? 'Uspešna registracija!' : 'Uspešna prijava!');
        window.location.href = '/';
        
    } catch (err: any) {
        console.error('Greška:', err);
        console.error('Response data:', err.response?.data);
        
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
                    
                    <label className='rememberText'>
                        <input 
                            type="checkbox" 
                            checked={remember} 
                            onChange={(e) => setRemember(e.target.checked)} 
                        /> 
                        Zapamti me
                    </label>
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