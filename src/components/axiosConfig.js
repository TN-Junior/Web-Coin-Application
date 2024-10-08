// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/auth',  // Base URL do backend Spring Boot
});

export default axiosInstance;
