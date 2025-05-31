import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    switch (status) {
      case 400:
        console.log("400 Error:\n");
        break;
      case 401:
        console.log("401 Unauthorized:\n");
        break;
      case 403:
        console.log("403 Forbidden:\n");
        break;
      case 404:
        console.log("404 Not Found:\n");
        break;
      case 409:
        console.log("409 Conflict:\n");
        break;
      case 500:
        console.log("500 Internal Server Error:\n");
        break;
      default:
        console.log("Unhandled Error:\n");
    }

    console.log("Error Message:\n", error.response?.data?.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
