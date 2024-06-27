import axios from "axios";
import { BASE_URL } from "./vars";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use((config) => {
  const { userData } = store.getState().auth;

  const excludedRoutes = ["/login", "/signup", "/forgot-password"];

  if (!excludedRoutes.includes(config.url)) {
    if (userData && userData.record.authtoken) {
      config.headers.Authorization = `Bearer ${userData.record.authtoken}`;
    }
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { userData } = store.getState().auth;

      if (!(userData && userData.record.authtoken)) {
        store.dispatch(logout);
        return await Promise.reject();
      }
    }
    return await Promise.reject(error);
  }
);

export default client;
