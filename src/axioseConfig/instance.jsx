import axios from 'axios';
const axiosInstance = axios.create({
   baseURL: "https://deploying-backend-taupe.vercel.app/",
//  baseURL: "http://localhost:3001",
headers: {
  'Content-Type': 'application/json',
    //'Job-Id': jobId
},
});




axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = ` ${token}`;
  }
  // console.log('Request sent:', config);
  return config;
}, error => {
  // console.error('Request error:', error);
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(response => {
  // console.log('Response received:', response);
  return response;
}, error => {
  // console.error('Response error:', error);
  return Promise.reject(error);
});




export default axiosInstance ;
