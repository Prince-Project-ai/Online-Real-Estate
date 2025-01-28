import React from 'react'

const TableSkeleton = () => (
    <div className="w-full bg-white rounded-lg shadow-sm">
        {/* Header Controls */}
        <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <span className="text-sm">Rows per page:</span>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm">View:</span>
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Table Header */}
        <div className="w-full">
            <div className="grid grid-cols-7 bg-gray-50 p-4 border-y">
                <div className="font-semibold">#</div>
                <div className="font-semibold">Profile</div>
                <div className="font-semibold">Name</div>
                <div className="font-semibold">Email</div>
                <div className="font-semibold">Phone</div>
                <div className="font-semibold">Role</div>
                <div className="font-semibold">Actions</div>
            </div>

            {/* Skeleton Rows */}
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="grid grid-cols-7 p-4 items-center border-b">
                    <div className="h-4 w-4">
                        {index}
                    </div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-end gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
    </div>
)

export default TableSkeleton