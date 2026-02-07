import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // ide preko proxy
  //withCredentials: true, // ako koristiš Laravel Sanctum
});

export default api;