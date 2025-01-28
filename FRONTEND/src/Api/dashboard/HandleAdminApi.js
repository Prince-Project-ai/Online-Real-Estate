import axios from "axios";

axios.defaults.withCredentials = true;

export const HandleAdminApi = axios.create({
  baseURL: "http://localhost:9999/api/v1/propertyfy/admin/",
  headers: {
    "Content-Type": "application/json",
  },
});

// admin sign in
export const AdminSignIn = async (form) => {
  return await HandleAdminApi.post("/admin-sign-in", form);
};

export const AdminAuth = async () => {
  return await HandleAdminApi.get("/current-admin");
};

export const AdminLogoutApi = async () => {
  return await HandleAdminApi.post("/admin-logout");
};

export const allUserInfo = async () => {
  const res = await HandleAdminApi.get("/all-users");
  return res?.data;
};

// what is my process of admin sign in

// first of the i will create the api call and print the response and erro in log

// then i will go to that sign in page and mkae a useState that do the form data and and save in form object and iw will create the on chnagr evvent i want ot make this proocees very optimize that whhy i will using usememoe and and seprateh the each compoent the
