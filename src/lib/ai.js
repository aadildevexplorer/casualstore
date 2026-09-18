import axios from "axios";
const API = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://zylomart-production.up.railway.app/api",
});

export const sendMessage = async (messages) => {
  const { data } = await API.post("/ai/chat", {
    messages,
  });

  return data;
};
