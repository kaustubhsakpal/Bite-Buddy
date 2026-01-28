import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const addfood = async (foodData, image) => {
  const formData = new FormData();

  formData.append(
    "food",
    new Blob([JSON.stringify(foodData)], {
      type: "application/json",
    })
  );

  formData.append("file", image);

  try {
    const token = localStorage.getItem("adminToken");

    await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        //  DO NOT set Content-Type manually for FormData
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
