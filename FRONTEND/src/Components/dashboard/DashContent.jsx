import React, { useCallback, useEffect, useState } from "react";
import DataTable from "./Components/DataTable";
import { allUserInfo } from "../../Api/dashboard/HandleAdminApi";
import { useMessage } from "../../Contexts/MessageContext";

const DashContent = () => {
  //data fetching for all user in dashboard
  const { showToast } = useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const fetchAllUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await allUserInfo();
      if (response?.success) {
        setUserInfo(response?.data);
      }
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Error in DataFetching",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className=" w-full p-5 page-body flex-1 overflow-hidden overflow-y-auto">
      <div className="dashboard-atglance mb-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="glance p-4 bg-secondary rounded-lg">
          <div className="lable text-sm font-semibold text-gray-500">
            Heading
          </div>
          <div className="glance-body flex items-center space-x-3 mt-3">
            <i className="ri-map-pin-user-line text-blue-500 text-3xl"></i>
            <h3 className="text-lg fo nt-bold text-gray-800">Total House</h3>
          </div>
        </div>
        <div className="glance p-4 bg-secondary rounded-lg">
          <div className="lable text-sm font-semibold text-gray-500">
            Heading
          </div>
          <div className="glance-body flex items-center space-x-3 mt-3">
            <i className="ri-map-pin-user-line text-green-500 text-3xl"></i>
            <h3 className="text-lg font-bold text-gray-800">Total House</h3>
          </div>
        </div>
        <div className="glance p-4 bg-secondary rounded-lg">
          <div className="lable text-sm font-semibold text-gray-500">
            Heading
          </div>
          <div className="glance-body flex items-center space-x-3 mt-3">
            <i className="ri-map-pin-user-line text-red-500 text-3xl"></i>
            <h3 className="text-lg font-bold text-gray-800">Total House</h3>
          </div>
        </div>
        <div className="glance p-4 bg-secondary rounded-lg">
          <div className="lable text-sm font-semibold text-gray-500">
            Heading
          </div>
          <div className="glance-body flex items-center space-x-3 mt-3">
            <i className="ri-map-pin-user-line text-purple-500 text-3xl"></i>
            <h3 className="text-lg font-bold text-gray-800">Total House</h3>
          </div>
        </div>
      </div>
      <DataTable data={userInfo} />
    </div>
  );
};

export default React.memo(DashContent);
