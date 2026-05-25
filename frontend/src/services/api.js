import axios from "axios";

// Configuração da API
const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;