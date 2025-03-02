// import React from "react";

// const Topbar = ({ setisOpenSidebar, isOpenSidebar }) => {
//   return (
//     <>
//       <header className="relative w-full h-12 py-3 border-b border-gray-300 flex justify-between items-center px-5">
//         <div className="toggle-bar">
//           <button
//             onClick={() => setisOpenSidebar((prev) => (!prev))}
//             className="h-8 w-8 bg-secondary text-xl rounded-lg"><i className={`${isOpenSidebar ? 'ri-xrp-line' : 'ri-menu-4-fill'}`}></i></button>
//         </div>
//         <div className="profile flex items-center space-x-2">
//           <button className="profile-img h-8 w-8 bg-secondary text-xl rounded-lg">
//             <i className="ri-user-3-line"></i>
//           </button>
//           <div className="toggle-menu">
//             <h2 className="text-[18px] font-inter me-2">Super Admin</h2>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default React.memo(Topbar);


import React from "react";
import { useAdminAuth } from "../../Contexts/ADMIN/AdminAuthContext";

const Topbar = ({ setSidebarToggle, sidebarToggle }) => {
  const { adminInfo } = useAdminAuth();
  return (
    <header className="relative w-full h-12 py-3 border-b border-gray-300 flex justify-between items-center px-5">
      <div className="toggle-bar">
        <button onClick={() => setSidebarToggle((prev) => (!prev))} className="w-9 border-dark h-9 bg-secondary rounded-lg border-2">
          <i className={`${sidebarToggle ? 'ri-menu-5-fill' : 'ri-close-large-fill'} text-xl`}></i>
          {/* <i className=""></i> */}
        </button>
      </div>
      <div className="profile flex items-center space-x-2">
        <button className="profile-img relative h-9 w-9 bg-secondary text-xl rounded-lg">
          <i className="ri-user-3-line"></i>
          <span className="live absolute -top-[1px] -right-3px h-2 rounded-full border-2 border-white w-2 bg-green-600"></span>
        </button>
        <div className="cursor-pointer">
          <div className="name-role leading-4 font-inter"><p className="font-inter">{adminInfo?.fullName}</p><p className="role font-inter text-xs text-zinc-500">{adminInfo?.role}</p></div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Topbar);
