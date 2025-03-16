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

export const searchPropertyByFilter = async (formData) => {
	const res = await handleUserApi.post("/search-result", formData, {
		headers: {
			"Content-Type": "application/json",
		}
	});
	return res?.data;
}

export const reviewByProduct = async (productId) => {
	const res = await handleUserApi.get(`/revies/${productId}`);
	return res?.data;
}

export const deleteReview = async (reviewId) => {
	const res = await handleUserApi.delete(`/delete-review/${reviewId}`);
	return res?.data;
}

export const addReviewByProduct = async (formData, productId) => {
	const res = await handleUserApi.post(`/post-review/${productId}`, formData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return res?.data;
}

export const updateReview = async (reviewId, reviewData) => {
	const res = await handleUserApi.patch(`/update-revies/${reviewId}`, reviewData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return res?.data;
}

export const getSellerInfo = async (id) => {
	const res = await handleUserApi.get(`/seller-info/${id}`);
	return res?.data;
}

export const UpdateAgentProfile = async (formData) => {
	const response = await handleUserApi.patch(
		"/update-agent-profile",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
};

export const fetchSellerReviewBYId = async (id) => {
	const response = await handleUserApi.get(`/seller-review/${id}`);
	return response.data;
};

export const fetchChatMessages = async (senderId, receiverId) => {
	try {
		const response = await handleUserApi.get(`/fetchChatMessages?senderId=${senderId}&receiverId=${receiverId}`);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching chat messages:', error);
		throw error;
	}
};

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


export const showAllProperty = async () => {
	const res = await handleUserApi.get('/all-property');
	return res.data;
}

export const showPropertyDetails = async (id) => {
	const res = await handleUserApi.get(`/property-details/${id}`);
	return res.data;
}

export const fetchPendingApproval = async (id) => {
	const res = await handleUserApi.get(`/get-pending-listing/${id}`);
	return res.data;
}

export const updateListingSeller = async (propertyId, formData) => {
	const res = await handleUserApi.patch(`/update-seller-listing/${propertyId}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};