import axios from "axios";
export const handleUserApi = axios.create(
  {
    baseURL: "http://localhost:9999/api/v1/propertyfy/",
    headers: {
      "Content-Type": "application/json",
    }
  }
)

// signUp
export const signUp = async (formData, showToast) => {
  try {
    const response = await handleUserApi.post("/sign-up", formData);
    if (response?.data?.success) {
      showToast(response?.data?.message, "success")
    }
    return response?.data;
  } catch (error) {
    showToast(error?.response?.data?.message || error?.message, "error")
  }
}