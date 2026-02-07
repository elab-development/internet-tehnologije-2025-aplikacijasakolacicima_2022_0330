import api from './axios';

export const login = async (email: string, password: string) => {
  await api.get('/sanctum/csrf-cookie'); 

  const res = await api.post('/login', { email, password });
  return res.data;
};