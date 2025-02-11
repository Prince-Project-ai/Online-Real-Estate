import React, { useCallback, useEffect, useState, lazy, Suspense, useMemo } from "react";
import { allUserInfo, RemoveAuthAccess } from "../../Api/dashboard/HandleAdminApi";
import { useMessage } from "../../Contexts/MessageContext";
import TdHash from "./comman/DataTable/TdHash";
import TdImg from "./comman/DataTable/TdImg";
import Td from "./comman/DataTable/Td";
import Model from "./comman/Model";
import ButtonSpinner from "../Loaders/ButtonSpinner.jsx";

const DataTable = lazy(() => import("./Components/DataTable"));

const DashContent = () => {
  const thFieldForAllUser = useMemo(() => ["#", "Profile", "Name", "Email", "Phone", "Role", "Actions"], []);
  const renderField = useMemo(() => ["hash", "avatar", "fullName", "email", "phoneNumber", "role", "_id", "model"], []);

  const { showToast } = useMessage();
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowPerPage, setRowPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await allUserInfo();
      if (response?.success) {
        setUserInfo(response?.data);
      }
    } catch (error) {
      showToast(error?.response?.data?.message || "Error in DataFetching", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

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
  };

  // Filter userInfo based on search query
  const filteredUsers = useMemo(() => {
    return userInfo.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userInfo, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / rowPerPage);
  const startIndex = (currentPage - 1) * rowPerPage;
  const displayedRows = filteredUsers.slice(startIndex, startIndex + rowPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="w-full p-5 page-body flex-1 overflow-hidden overflow-y-auto">
      <div className="dashboard-atglance mb-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {/* Your glance components here */}
      </div>
      <div className="border p-3 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-gray-700 font-medium">Rows per page:</label>
            <select
              id="rowsPerPage"
              value={rowPerPage}
              onChange={(e) => {
                setRowPerPage(parseInt(e.target.value));
                setCurrentPage(1); // Reset to first page when changing rows per page
              }}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300 w-full"
            />
            <i className="absolute top-1/2 -translate-y-[50%] left-3 text-gray-400 ri-search-line"></i>
          </div>
        </div>
        <Suspense fallback={<ButtonSpinner />}>
          <DataTable thField={thFieldForAllUser}>
            {
              displayedRows.map((rowItem, rowIndex) => {
                const overallIndex = startIndex + rowIndex + 1;
                return (
                  <tr key={rowItem["_id"]} className="hover:bg-secondary border-b">
                    {
                      renderField.map((field, fieldIndex) => {
                        if (field === "hash") return <TdHash key={fieldIndex + 101} hash={overallIndex} />;
                        if (field === "avatar") return <TdImg key={rowIndex + 102} FieldValue={rowItem[field]} />;
                        if (field === "model") return (
                          <td key={rowIndex}>
                            <Model ModelOutSideBtn="Action" ModelLable="Grant Permission">
                              <>
                                <div className="model-body p-3">
                                  <div className="space-y-4">
                                    <div className="flex justify-center">
                                      <img
                                        src={rowItem["avatar"]}
                                        alt="User_Avatar"
                                        className="w-24 h-24 rounded-full object-cover"
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <p className="text-lg font-inter">{rowItem["fullName"]}</p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <p className="text-lg font-inter break-words">{rowItem["email"]}</p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <p className="text-lg font-inter">{rowItem["phoneNumber"]}</p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                        <p className="text-lg font-inter">{rowItem["role"]}</p>
                                      </div>
                                      <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <p className="text-lg font-inter">{rowItem["address"]}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-3 space-x-3 border-t border-gray-200 text-end">
                                  <button
                                    type="submit"
                                    value={rowItem["_id"]}
                                    onClick={handleAuthRemove}
                                    className="font-inter py-2 text-xs px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
                                  >
                                    {isLoading ? "Deleting..." : "Remove"}
                                  </button>
                                </div>
                              </>
                            </Model>
                          </td>
                        );
                        if (field !== "_id") return <Td key={fieldIndex + 45} FieldValue={rowItem[field]} />;
                      })
                    }
                  </tr>
                );
              })
            }
          </DataTable>
        </Suspense>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600">
            Showing {startIndex + 1} - {Math.min(startIndex + rowPerPage, filteredUsers.length)} of {filteredUsers.length} rows
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="bg-dark disabled:cursor-not-allowed disabled:opacity-50 text-white px-4 py-2 rounded-lg"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-dark disabled:cursor-not-allowed disabled:opacity-50 text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashContent);