import axios from "axios";

const client = axios.create({
  baseURL: "http://15.164.129.239",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
