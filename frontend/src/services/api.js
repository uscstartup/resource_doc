import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getRecommendations = async (profile) => {
  const response = await API.post("/recommend", profile);
  return response.data;
};