import axios from "axios";

export const deleteFood = (id) => {
  const token = localStorage.getItem("adminToken");

  return axios.delete(
    `http://localhost:8080/api/foods/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
