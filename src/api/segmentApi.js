import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:3600" });
const API = axios.create({
  baseURL: "https://webhook.site/49099b45-a30d-485f-96a5-c6bcbe9f732b",
  withCredentials: false,
});

export const SaveData = (data) => API.post("/", data);
