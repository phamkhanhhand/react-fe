import axios from "axios";

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

// Thêm interceptor tự động attach token từ localStorage
AuthRequest.interceptors.request.use((request) => {
  const token = localStorage.getItem("accessToken");
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});
