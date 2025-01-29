import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
// import DataTable from "";
const DataTable = lazy(() => import("./Components/DataTable"));
import { allUserInfo } from "../../Api/dashboard/HandleAdminApi";
import { useMessage } from "../../Contexts/MessageContext";
import { useMemo } from "react";
import TableSkeleton from "./Components/skeletion/TableSkeleton";
import TdHash from "./comman/DataTable/TdHash";
import TdImg from "./comman/DataTable/TdImg";
import TdModel from "./comman/DataTable/TdModel";
import Td from "./comman/DataTable/Td";


const DashContent = () => {
  const thFieldForAllUser = useMemo(() => ["#", "Profile", "Name", "Email", "Phone", "Role", "Actions"], []);
  const renderField = useMemo(() => ["hash", "avatar", "fullName", "email", "phoneNumber", "role", "_id", "model"], []);

  const { showToast } = useMessage();
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return <TableSkeleton />
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

      <Suspense fallback={<TableSkeleton />}>
        <DataTable thField={thFieldForAllUser}>
          {
            userInfo.map((rowItem, rowIndex) => {
              return (
                <tr key={rowIndex} className="hover:bg-secondary border-b">
                  {
                    renderField.map((field, fieldIndex) => {
                      if (field === "hash") return <TdHash key={fieldIndex + 101} hash={rowIndex + 1} />

                      if (field === "avatar") return <TdImg key={rowIndex + 102} FieldValue={rowItem[field]} />

                      if (field === "model") return (<TdModel key={rowItem["_id"]} lable="Permisstion" modelInsideBtn="Remove" ModelOutSideBtn="Action">
                        <p>Hello This is Model Body Daynamic</p>
                      </TdModel>)

                      if (field !== "_id") return <Td key={fieldIndex + 45} FieldValue={rowItem[field]} />
                    })
                  }
                </tr>
              )
            })
          }
        </DataTable>
      </Suspense>
    </div>
  );
};

export default React.memo(DashContent);
