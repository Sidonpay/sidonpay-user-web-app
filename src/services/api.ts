import axios from "axios";

// Configuration from documentation
const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (Unauthorized) specifically if needed
    if (error.response && error.response.status === 401) {
      // Optional: Clear token and redirect to login
      // localStorage.removeItem('userAccessToken');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
