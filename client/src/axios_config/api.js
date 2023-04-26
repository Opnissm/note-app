import axios from "axios";

let url;

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  url = "https://note-app-x68g.onrender.com";
}

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // User is not authenticated, redirect to unauthenticated page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
