import { getCookie } from "cookies-next";
import axios from "axios";
import { API_URL, TEST_API_URL } from "config/apiUrl";

const axiosInstance = axios.create({
  baseURL: API_URL,
  // headers: { "Accept-Encoding": "gzip,deflate,compress" }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getCookie("front_token");
    if (config.headers && token) {
      (config as any).headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const axiosWebInstance = axios.create({
  baseURL: `${API_URL}/web`,
  // headers: { "Accept-Encoding": "gzip,deflate,compress" }
});

axiosWebInstance.interceptors.request.use(
  async (config) => {
    const token = getCookie("front_token");
    if (config.headers && token) {
      (config as any).headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance, axiosWebInstance };
