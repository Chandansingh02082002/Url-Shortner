import axios from "axios";

export const API = axios.create({
  baseURL: "https://url-shortner-3u3d.onrender.com/api/links",
});
