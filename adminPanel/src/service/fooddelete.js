import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const deleteFood = async (foodId) => {
  return axios.delete(`${API_URL}/${foodId}`);
};
