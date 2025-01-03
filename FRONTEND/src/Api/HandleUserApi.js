import axios from "axios";

export const handleUserApi = axios.create(
  {
    baseURL: "http://localhost:3001/api/user",
    headers: {
      "Content-Type": "application/json",
    }
  }
)

// signUp

export const signUp = async () => {
  // try {
  //   const response = await handleUserApi.post("/signup")
  //   return response.data
  // } catch (error) {
  //   console.error(error)
  // }
}