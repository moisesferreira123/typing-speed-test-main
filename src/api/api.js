import axios from "axios";
// https://typing-speed-test-backend-1ddt.onrender.com
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 12000
});

export default api;