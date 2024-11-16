import axios from "axios"; 
const instance = axios.create({
  baseURL: `https://react-app-backend-ten.vercel.app`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});
export default instance;
