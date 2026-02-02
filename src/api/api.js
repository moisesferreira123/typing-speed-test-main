import axios from "axios";

const api = axios.create({
  baseURL: "https://typing-speed-test-backend-1ddt.onrender.com",
  timeout: 12000
});

export default api;