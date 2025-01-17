import React from "react";

const HeaderSkeleton = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      {/* Logo Skeleton */}
      <div className="h-6 w-32 bg-gray-300 rounded-md animate-pulse"></div>

      {/* Navigation Skeleton */}
      <div className="flex space-x-6">
        <div className="h-5 w-12 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-5 w-12 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-5 w-12 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-5 w-12 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      {/* Logout Button Skeleton */}
      <div className="h-8 w-20 bg-gray-300 rounded-md animate-pulse"></div>
    </header>
  );
};

export default HeaderSkeleton;
