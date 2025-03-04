import React, { useCallback, useEffect } from "react";
import { BsHouseDoor, BsArrowRight } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../../Contexts/AuthContext";
import { fetchPendingApproval, showAllProperty } from "../../Api/website/HandleUserApi";

const DashContent = () => {
  const { currentAuth, totalProperty, totalView, pendingApprovals, totalSpending, setTotalProperty, setTotalView, setPendingApprovals, setTotalSpending } = useAuth();

  const calculatingTotalProperty = useCallback(async () => {
    try {
      const response = await showAllProperty();
      if (response?.success) {
        setTotalProperty(response?.data?.length);
        setTotalSpending((response?.data?.reduce((sum, property) => sum + property.price, 0) || 0).toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR'
        }));
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    }
  }, []);

  const calculatePendingPropertyById = useCallback(async () => {
    try {
      const response = await fetchPendingApproval(currentAuth?._id);
      if (response?.success) {
        setPendingApprovals(response?.data?.length);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    }
  }, []);


  useEffect(() => {
    calculatingTotalProperty();
    calculatePendingPropertyById();
    return () => {
      calculatingTotalProperty();
      calculatePendingPropertyById();
    };
  }, [currentAuth?._id]);
  return (
    <div className="dashboard-atglance w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      <div className="glance p-4 bg-white border-gray-300 border rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="flex justify-between items-center">
          <div className="label text-sm font-semibold text-gray-500">Total Property</div>
          <a href="/dashboard-seller/total-listing" className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center">
            View All <BsArrowRight className="ml-1" />
          </a>
        </div>
        <div className="glance-body flex items-center space-x-3 mt-3">
          <div className="icon-wrapper p-2 bg-blue-100 rounded-full">
            <BsHouseDoor className="text-blue-500 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 font-description">{totalProperty}</h3>
        </div>
      </div>

      {/* <div className="glance p-4 bg-white border-gray-300 border rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="flex justify-between items-center">
          <div className="label text-sm font-semibold text-gray-500">Total Views</div>
          <a href="/views" className="text-xs text-green-500 hover:text-green-700 font-medium flex items-center">
            View All <BsArrowRight className="ml-1" />
          </a>
        </div>
        <div className="glance-body flex items-center space-x-3 mt-3">
          <div className="icon-wrapper p-2 bg-green-100 rounded-full">
            <AiOutlineEye className="text-green-500 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 font-description">{totalView}</h3>
        </div>
      </div> */}

      <div className="glance p-4 bg-white border-gray-300 border rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="flex justify-between items-center">
          <div className="label text-sm font-semibold text-gray-500">Pending Properties</div>
          <a href="/dashboard-seller/view-approvals" className="text-xs text-orange-500 hover:text-orange-700 font-medium flex items-center">
            View All <BsArrowRight className="ml-1" />
          </a>
        </div>
        <div className="glance-body flex items-center space-x-3 mt-3">
          <div className="icon-wrapper p-2 bg-orange-100 rounded-full">
            <BiTimeFive className="text-orange-500 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 font-description">{pendingApprovals}</h3>
        </div>
      </div>

      <div className="glance p-4 bg-white border-gray-300 border rounded-lg shadow-sm hover:shadow transition-shadow">
        <div className="flex justify-between items-center">
          <div className="label text-sm font-semibold text-gray-500 ">Total Spending</div>
          <a href="/spending" className="text-xs text-purple-500 hover:text-purple-700 font-medium flex items-center">
            View All <BsArrowRight className="ml-1" />
          </a>
        </div>
        <div className="glance-body flex items-center space-x-3 mt-3">
          <div className="icon-wrapper p-2 bg-purple-100 rounded-full">
            <FaMoneyBillWave className="text-purple-500 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 font-description">{totalSpending}</h3>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashContent);