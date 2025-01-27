import React, { useState } from "react";
import { logoutAuth } from "../../../Api/website/HandleUserApi";
import Spinner from "../../core/Spinner";
import { useMessage } from "../../../Contexts/MessageContext";
import { useAuth } from "../../../Contexts/AuthContext";
import ButtonSpinner from "../../Loaders/ButtonSpinner";

const Signout = () => {
  const { showToast } = useMessage();
  const { setCurrentAuth, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await logoutAuth(showToast, setCurrentAuth, setIsAuthenticated);
      if (res?.success) {
        setIsAuthenticated(false);
        setCurrentAuth(null);
        showToast("Logout Successfully.", "success");
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex bg-secondary w-full justify-center py-1 rounded border hover:bg-dark  hover:text-white duration-200 items-center gap-2">
      {
        isLoading ? <ButtonSpinner /> : <> Logout
          <i className="ri-logout-circle-r-line"></i></>
      }
    </button>
  );
};

export default Signout;
