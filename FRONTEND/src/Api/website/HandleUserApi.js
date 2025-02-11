import axios from "axios";

// Set withCredentials globally
axios.defaults.withCredentials = true;

export const handleUserApi = axios.create(
	{
		baseURL: "http://localhost:9999/api/v1/propertyfy/",
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

// fetch current auth
export const currentUser = async () => {
	const response = await handleUserApi.get("/current-auth");
	return response?.data;
}

// logout user,agent,seller
export const logoutAuth = async () => {
	const response = await handleUserApi.post("/logout-user");
	return response.data;
}

// Email Verifying
export const emailVerifying = async (email) => {
	const res = await handleUserApi.post("/verify-email", email);
	return res?.data;
}

// reser Password
export const resetPasswordApi = async (resetPasswordData) => {
	const res = await handleUserApi.patch("/reset-password", resetPasswordData);
	return res?.data;
}

// AGENT API END POINT LOGIC START

export const UpdateAgentProfile = async (formData) => {
	const response = await handleUserApi.patch(
		"/update-agent-profile", // Use the correct API endpoint
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
};

// AGENT API END POINT LOGIC END 


/*
	============= SELLER API LOGIC LIST START ==============
*/

export const addListingSeller = async (formData) => {
	const res = await handleUserApi.post("/add-seller-property", formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return res.data;
}

export const getAllListing = async () => {
	const res = await handleUserApi.get("/get-all-listing");
	return res.data;
}

export const deleteSellerListing = async (deleteId) => {
	const res = await handleUserApi.delete(`/delete-listing/${deleteId}`);
	return res.data;
}

export const updateListingSeller = async (propertyId, formData) => {
	console.log("Property ID:", propertyId);

	for (let [key, value] of formData.entries()) {
		console.log(key, value);
	}

	const res = await handleUserApi.patch(`/update-seller-listing/${propertyId}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};

/*
	============= SELLER API LOGIC LIST END ==============
*/