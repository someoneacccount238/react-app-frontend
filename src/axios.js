import axios from "axios"; 
const instance = axios.create({
  baseURL: `https://react-app-backend-2643b62b1d3c.herokuapp.com`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});
export default instance;
