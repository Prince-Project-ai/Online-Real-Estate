import axios from "axios";

axios.defaults.withCredentials = true;

export const HandleAdminApi = axios.create({
  baseURL: "http://localhost:9999/api/v1/propertyfy/admin/",
});

// admin sign in
export const AdminSignIn = async (form) => {
  return await HandleAdminApi.post("/admin-sign-in", form);
};

// admin isLoggedIn
export const AdminAuth = async () => {
  const response = await HandleAdminApi.get("/current-admin");
  return response?.data;
};

export const AdminLogoutApi = async () => {
  return await HandleAdminApi.post("/admin-logout");
};

export const allUserInfo = async () => {
  const res = await HandleAdminApi.get("/all-users");
  return res?.data;
};

export const RemoveAuthAccess = async (authId) => {
  const res = await HandleAdminApi.delete(`/remove-auth/${authId}`);
  return res?.data;
};

export const UpdateAdminProfile = async (formData) => {
  console.log(formData);
  const response = await HandleAdminApi.patch("/update-admin-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  return response.data;
};

export const fetchPendingPropertyApproval = async () => {
  const res = await HandleAdminApi.get("/fetch-pending-approval");
  return res?.data;
}

export const approvePendingApprovals = async (id, action) => {
  const res = await HandleAdminApi.patch(`/property-approve/${id}`, { status: action });
  return res?.data;
}


export const fetchAllPropertyFromAdmin = async () => {
  const res = await HandleAdminApi.get("/fetch-all-property");
  return res?.data;
}