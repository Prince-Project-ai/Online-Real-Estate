import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-12 py-2 flex items-center justify-center bg-white border-gray-300 border-t">
      <p className="text-sm text-black">
        © 2025 PropertyFy. All rights reserved.
      </p>
    </footer>
  );
};

export default React.memo(Footer);
