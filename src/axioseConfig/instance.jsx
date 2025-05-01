import axios from 'axios';
import { t } from 'i18next';
const axiosInstance = axios.create({
   baseURL: "https://careers-api-six.vercel.app/",
//  baseURL: "http://localhost:3001",
headers: {
  'Content-Type': 'application/json',
},
});




axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});




export default axiosInstance ;
