import React, { useState } from "react";
import { logoutAuth } from "../../../Api/website/HandleUserApi";
import Spinner from "../../core/Spinner";
import { useMessage } from "../../../Contexts/MessageContext";
import { useAuth } from "../../../Contexts/AuthContext";

const Signout = () => {
  const { showToast } = useMessage();
  const { setCurrentAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await logoutAuth(showToast, setCurrentAuth);
    } catch (error) {
      console.log("Error From The logout button : ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-dark rounded tracking-wider text-white px-4 py-2 flex items-center gap-2">
      {
        isLoading ? <Spinner /> : <> Logout
          <i className="ri-logout-circle-r-line"></i></>
      }
    </button>
  );
};

export default Signout;
