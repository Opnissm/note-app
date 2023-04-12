import axios from "axios";

let url;

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  url = "https://note-app-x68g.onrender.com";
}

export default axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
