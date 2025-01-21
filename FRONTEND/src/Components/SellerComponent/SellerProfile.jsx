import React, { useMemo, useState } from "react";
import PersonalInfo from "./ProfileComponent/PersonalInfo";
import Security from "./ProfileComponent/Security";
import Notification from "./ProfileComponent/Notification";

const SellerProfile = () => {
  const menuItems = useMemo(() => ["Profile", "Security", "Notification"], []);

  const [selectedMenu, setSelectedMenu] = useState("Profile");
  return (
    <>
      <div className="breadcrumb mb-2">
        <h1 className="text-xl font-inter font-semibold">Edit Profile</h1>
      </div>
      <div className="bg-white border-gray-300 border rounded-lg p-4">
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-3">
            <ul>
              {menuItems.map((menu, index) => (
                <Menu
                  key={index}
                  menu={menu}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={() => setSelectedMenu(menu)}
                />
              ))}
            </ul>
          </div>
          <div className="col-span-9">
            {selectedMenu === "Profile" && <PersonalInfo />}
            {selectedMenu === "Security" && <Security />}
            {selectedMenu === "Notification" && <Notification />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;

const Menu = React.memo(({ menu, setSelectedMenu, selectedMenu }) => (
  <li
    onClick={setSelectedMenu}
    className={`${selectedMenu === menu ? "bg-secondary" : "bg-light text-dark"
      } font-inter cursor-pointer py-2 px-3 mb-3 font-[500] opacity-80 hover:opacity-100 rounded-lg text-[18px]`}
  >
    <i
      className={`${menu === "Profile"
        ? "ri-user-line"
        : menu === "Security"
          ? "ri-lock-2-fill"
          : "ri-notification-2-fill"
        } me-3 font-semibold text-lg`}
    ></i>
    {menu}
  </li>
));
