import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";

const DataTable = lazy(() => import("./Components/DataTable"));
import { allUserInfo, RemoveAuthAccess } from "../../Api/dashboard/HandleAdminApi";

import { useMessage } from "../../Contexts/MessageContext";
import { useMemo } from "react";
import TdHash from "./comman/DataTable/TdHash";
import TdImg from "./comman/DataTable/TdImg";
import Td from "./comman/DataTable/Td";
import Model from "./comman/Model";
import ButtonSpinner from "../Loaders/ButtonSpinner.jsx";

const DashContent = () => {
  const thFieldForAllUser = useMemo(() => ["#", "Profile", "Name", "Email", "Phone", "Role", "Actions"], []);
  const renderField = useMemo(() => ["hash", "avatar", "fullName", "email", "phoneNumber", "role", "_id", "model"], []);

  const { showToast } = useMessage();
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userFilter, setUserFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    if (userFilter === "All") return userInfo;
    return userInfo.filter((row) => row["role"] === userFilter);
  }, [userInfo, userFilter]);

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

  // remove Auth Functionality

  const handleAuthRemove = async (e) => {
    e.preventDefault();
    const authId = e.target.value;
    setIsLoading(true);
    try {
      const res = await RemoveAuthAccess(authId);
      if (res?.success) {
        showToast(res?.message, "success");
        fetchAllUser();
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    } finally {
      setIsLoading(false);
    }
  }


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

      {/* <div className="p-5 bg-white border rounded-lg shadow"> */}

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        {/* <div className="flex items-center gap-2">
          <label htmlFor="rowsPerPage" className="text-gray-700 font-medium">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            className="appearance-none border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div> */}


        


        {/* <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300 w-full"
            />
            <i className="absolute left-3 top-2.5 text-gray-400 ri-search-line"></i>
          </div> */}
      </div>

      <Suspense fallback={<ButtonSpinner />}>
        <DataTable thField={thFieldForAllUser}>
          {
            filteredUsers.map((rowItem, rowIndex) => {
              return (
                <tr key={rowIndex} className="hover:bg-secondary border-b">
                  {
                    renderField.map((field, fieldIndex) => {
                      if (field === "hash") return <TdHash key={fieldIndex + 101} hash={rowIndex + 1} />

                      if (field === "avatar") return <TdImg key={rowIndex + 102} FieldValue={rowItem[field]} />

                      if (field === "model") return (
                        <td key={rowIndex}>
                          <Model ModelOutSideBtn="Action" ModelLable="Grant Permisstion" >
                            {
                              <>
                                <div className="model-body p-3">
                                  <div className="space-y-4">
                                    {/* Avatar */}
                                    <div className="flex justify-center">
                                      <img
                                        src={rowItem["avatar"]}
                                        alt="User Avatar"
                                        className="w-24 h-24 rounded-full object-cover"
                                      />
                                    </div>

                                    {/* Grid Layout for User Data */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {/* Full Name */}
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <p className="text-lg font-inter">{rowItem["fullName"]}</p>
                                      </div>

                                      {/* Email */}
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <p className="text-lg font-inter break-words">{rowItem["email"]}</p>
                                      </div>

                                      {/* Phone Number */}
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <p className="text-lg font-inter">{rowItem["phoneNumber"]}</p>
                                      </div>

                                      {/* Role */}
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                        <p className="text-lg font-inter">{rowItem["role"]}</p>
                                      </div>

                                      {/* Address */}
                                      <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <p className="text-lg font-inter">{rowItem["address"]}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Model Footer */}
                                <div className="p-3 space-x-3 border-t border-gray-200 text-end">
                                  <button
                                    type="submit"
                                    value={rowItem["_id"]}
                                    onClick={handleAuthRemove}
                                    // value={}
                                    className="font-inter py-2 text-xs px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
                                  >
                                    {
                                      isLoading ? "Deleting..." : "Remove"
                                    }
                                  </button>

                                </div>
                              </>
                            }
                          </Model>
                        </td>
                      )

                      if (field !== "_id") return <Td key={fieldIndex + 45} FieldValue={rowItem[field]} />
                    })
                  }
                </tr >
              )
            })
          }
        </DataTable >
      </Suspense >
      {/* </div> */}
    </div >
  );
};

export default React.memo(DashContent);
