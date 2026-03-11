import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");
  const token = adminToken || userToken;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
