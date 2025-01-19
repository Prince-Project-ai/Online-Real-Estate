import React from 'react';

const DashboardSkeleton = () => {
  // Create array of 8 items for the grid
  const gridItems = Array(8).fill(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <div className="text-xl font-bold">PropertyFy</div>
          <div className="w-8 h-8 ml-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 p-4 bg-white">
          <div className="space-y-2">
            {Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-200 rounded animate-pulse"
              >
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          {/* Logout button skeleton */}
          <div className="mt-4 h-10 bg-red-200 rounded animate-pulse"></div>
        </div>

        {/* Main grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gridItems.map((_, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow animate-pulse"
              >
                <div className="text-sm text-gray-500 mb-2">Heading</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500">
        © 2024 PropertyFy. All rights reserved.
      </footer>
    </div>
  );
};
export default DashboardSkeleton;
