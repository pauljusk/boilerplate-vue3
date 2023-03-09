import axios from "axios";
export const baseUrl = import.meta.env.VITE_API_URL;

export default axios.create({
  baseURL: "/",
  // withCredentials: true,
  headers: {
    // Accept: 'application/json',
    // "Content-type": "application/json"
  },
});
