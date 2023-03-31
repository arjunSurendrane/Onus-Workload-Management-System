import axios from "axios";

export const url = "/api";

const instance = axios.create({
  baseURL: url,
});

export default instance;
