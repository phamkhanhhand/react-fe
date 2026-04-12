// import api from './api';

import { redirect } from "react-router-dom";
import { PublicRequest } from "../hooks/api/axios";

export const login = async (username: string, password: string) => {
  const res = await PublicRequest.post('/auth/login', {
    username,
    password,
  });

  const token = res.data.access_token;

  localStorage.setItem('access_token', token);

  return res.data;
};

export const logout = () => {
   
  localStorage.removeItem('access_token');

  window.location.href = '/login';
};