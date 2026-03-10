import axios from 'axios';

/****/
const isProduction = window.location.hostname !== 'localhost';

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', 
  baseURL: isProduction 
  ? 'https://kolacici-backend.onrender.com/api' 
  : 'http://localhost:8000/api',
  withCredentials: true, 
  /*headers: {
    'Accept': 'application/json',
  },*/
});

export default api;