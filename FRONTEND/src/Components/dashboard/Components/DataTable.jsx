import React, { useState } from "react";
import ModelManager from "./ModelManager";

const DataTable = ({ data }) => {
  return (
    <div className="p-5 bg-white border-dark border rounded-lg shadow-lg">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        {/* Rows Per Page */}
        <div className="flex items-center gap-2">
          <label htmlFor="rowsPerPage" className="text-gray-700 font-medium">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            // value={rowsPerPage}
            // onChange={handleRowsChange}
            className="appearance-none border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        {/* Entity Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="entity" className="text-gray-700 font-medium">
            View:
          </label>
          <select
            id="entity"
            className="appearance-none border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            // value={searchTerm}
            // onChange={handleSearchChange}
            placeholder="Search..."
            className="border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300 w-full"
          />
          <i className="absolute left-3 top-2.5 text-gray-400 ri-search-line"></i>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="border">
            <tr className="text-white bg-dark">
              <th className="py-2 text-start font-inter text-sm border border-white px-4">
                #
              </th>
              <th className="py-2 text-start font-inter text-sm border border-white px-4">
                Name
              </th>
              <th className="py-2 text-start font-inter text-sm border border-white px-4">
                Email
              </th>
              <th className="py-2 text-start font-inter text-sm border border-white px-4">
                Role
              </th>
              <th className="py-2 text-start font-inter text-sm border border-white px-4">
                Status
              </th>
              <th className="py-2 text-start font-inter text-sm border border-white px-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              const { fullName, email, phoneNumber, address, role, avatar } =
                user;
              return (
                <tr
                  key={index}
                  className="text-gray-700 border-b hover:bg-gray-100"
                >
                  {/* <td className="py-2 px-4">{(currentPage - 1) * rowsPerPage + index + 1}Hello</td> */}
                  {/* <td className="py-2 px-4">0 * 5+1+1</td> */}
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img
                      src={avatar}
                      alt={email}
                      className="w-10 h-10 rounded-full object-fill"
                    />
                  </td>
                  <td className="py-2 px-4">{fullName}</td>
                  <td className="py-2 px-4">{email}</td>
                  <td className="py-2 px-4">{phoneNumber}</td>
                  <td className="py-2 px-4">{address}</td>
                  <td className="py-2 px-4">{role}</td>
                  <td>
                    <ModelManager />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-600">
          {/* Showing {(currentPage - 1) * rowsPerPage + 1}- */}
          {/* {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} rows */}
        </p>

        <div className="flex items-center gap-2">
          <button
          // onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          // disabled={currentPage === 1}
          // className={`px-3 py-1 rounded-lg border ${currentPage === 1
          //   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          //   : "bg-white text-indigo-500 hover:bg-indigo-100"
          //   }`}
          >
            Previous
          </button>
          <button
          // onClick={() =>
          //   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          // }
          // disabled={currentPage === totalPages}
          // className={`px-3 py-1 rounded-lg border ${currentPage === totalPages
          //   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          //   : "bg-white text-indigo-500 hover:bg-indigo-100"
          //   }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
