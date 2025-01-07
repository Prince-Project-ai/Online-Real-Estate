import axios from "axios";

// Set withCredentials globally
axios.defaults.withCredentials = true;

export const handleUserApi = axios.create(
  {
    baseURL: "http://localhost:9999/api/v1/propertyfy/",
    headers: {
      "Content-Type": "application/json",
    }
  }
)

// signUp
export const signUp = async (formData, showToast, onSwitchToSignIn) => {
  try {
    const response = await handleUserApi.post("/sign-up", formData);
    if (response?.data?.success) {
      showToast(response?.data?.message, "success");
      onSwitchToSignIn();
    }
    return response?.data;
  } catch (error) {
    showToast(error?.response?.data?.message || error?.message, "error")
  }
}
// singup

export const signIn = async (formData, showToast, onClose) => {
  try {
    const res = await handleUserApi.post("/sign-in", formData);
    showToast(res?.data?.message, "success");
    if (res?.data?.success) {
      localStorage.setItem("currentAuth", JSON.stringify(res?.data?.data?.loggedUser));
      onClose();
    }
  } catch (error) {
    showToast(error?.response?.data?.message, "error");
  }
}

export const currentUser = async () => {
  try {
    const response = await handleUserApi.get("/current-auth");
    return response?.data;
  } catch (error) {
    console.log(error);
    // alert(error?.message);
  }
} 
