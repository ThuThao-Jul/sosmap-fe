import axios from "axios";

const api = axios.create({
  baseURL: "https://hackathon-jaguar.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

export default api;
