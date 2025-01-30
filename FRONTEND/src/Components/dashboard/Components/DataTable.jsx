import React, { useState } from "react";

const DataTable = ({ thField, children }) => {

    const [rowPerPage, setRowPerPage] = useState(5);
    console.log(rowPerPage);

    return (
        <>
            {/* Table */}
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="rowsPerPage" className="text-gray-700 font-medium">
                        Rows per page:
                    </label>
                    <select
                        id="rowsPerPage"
                        value={rowPerPage}
                        onChange={(e) => setRowPerPage(parseInt(e.target.value))}
                        className="appearance-none border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                </div>


                {/* <div className="flex items-center gap-2">
          <label htmlFor="entity" className="text-gray-700 font-medium">
            View:
          </label>
          <select
            id="entity"
            onChange={(e) => setUserFilter(e.target.value)}
            className="appearance-none border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="All">All</option>
            <option value="User">User</option>
            <option value="Seller">Seller</option>
            <option value="Agent">Agent</option>
          </select>
        </div> */}


                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300 w-full"
                    />
                    <i className="absolute left-3 top-2.5 text-gray-400 ri-search-line"></i>
                </div>
            </div>
            <div className="overflow-x-auto" >
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                    <thead className="border">
                        <tr className="bg-secondary text-dark">
                            {
                                thField.map((name, i) => (<Th Field={name} key={i} />))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4" >
                <p className="text-gray-600">
                    {/* Showing {(currentPage - 1) * rowsPerPage + 1}- */}
                    {/* {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} rows */}
                </p>

                <div className="flex items-center gap-2">
                    <button>
                        Previous
                    </button>
                    <button>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default React.memo(DataTable);


const Th = React.memo(({ Field }) => (
    <th className="py-2 text-start font-inter text-sm px-4">
        {Field}
    </th>
));