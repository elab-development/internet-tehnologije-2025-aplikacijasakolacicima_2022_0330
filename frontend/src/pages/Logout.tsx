import axios from 'axios';

const LogoutTest = () => {
    const handleLogout = async () => {
      try {
        await axios.post('/api/logout');

        localStorage.clear(); // Obriši iz localStorage
        
        console.log('Odjava uspešna!');
        
        window.location.href = '/login';
        
    } catch (err: any) {
        console.error('Greška pri odjavi:', err.response?.data || err.message);
        localStorage.clear();
        window.location.href = '/login';
    }

    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Testiranje Odjave</h1>
            <hr />
            <button 
                onClick={handleLogout}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Odjavi se (Logout)
            </button>
        </div>
    );
};

export default LogoutTest;