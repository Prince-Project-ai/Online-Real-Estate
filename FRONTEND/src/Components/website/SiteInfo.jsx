import React from "react";
let i = 0;
const SiteInfo = () => {
  return (
    <div className="INFO tracking-wider bg-dark text-white py-2 px-3 flex items-center justify-between">
      <p><i className="ri-phone-fill me-2"></i><a href="tel:98548 52154">98548 52154</a></p>
      <p>render : {i++}</p>
      <p><i className="ri-send-plane-fill me-2"></i>propertyfy@gmail.com</p>
    </div>
  );
};

export default SiteInfo;
