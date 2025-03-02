import React, { useMemo, useState } from "react";
import PersonalInfo from "./ProfileComponent/PersonalInfo";

const SellerProfile = () => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-12">
            <PersonalInfo />
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
