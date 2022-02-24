import axios from "axios";
import { api as url } from "../constants";

const api = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
});


export default api;