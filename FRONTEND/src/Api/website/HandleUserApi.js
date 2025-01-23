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
export const signUpApi = async (formData) => {
	const res = await handleUserApi.post("/sign-up", formData);
	return res?.data;
}

// SignIn
export const signInApi = async (formData) => {
	const res = await handleUserApi.post("/sign-in", formData);
	return res.data;
}

export const currentUser = async () => {
	const response = await handleUserApi.get("/current-auth");
	return response?.data;
}

export const logoutAuth = async (showToast, setCurrentAuth, setIsAuthenticated) => {
	try {
		const response = await handleUserApi.post("/logout-user");
		if (response?.data?.success) {
			setCurrentAuth(null)
			setIsAuthenticated(false);
		};
		showToast(response?.data?.message, "success");
	} catch (error) {
		showToast(error, "error");
	}
}

// AGENT API END POINT LOGIC START

export const UpdateAgentProfile = async (updatedData) => {
	const response = await handleUserApi.patch("/update-agent-profile", updatedData);
}


// AGENT API END POINT LOGIC END 