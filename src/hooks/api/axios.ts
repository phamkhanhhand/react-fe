import axios from "axios";
// import api from "../../services/api";

// baseURL từ env
const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";



// Axios instance dùng cho public API
export const PublicRequest = axios.create({
  baseURL: BASE_URL,
});

// Axios instance dùng cho API cần auth
export const AuthRequest = axios.create({
  baseURL: BASE_URL,
});
 

// 👉 request interceptor (gắn token)
AuthRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

 