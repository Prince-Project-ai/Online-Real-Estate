import React from "react";
import Model from "../comman/Model";
// import ModelManager from "./ModelManager";

const DataTable = ({ data, thField, renderField }) => {

    return (
        <div className="p-5 bg-white border rounded-lg shadow">
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
                        <tr className="bg-secondary text-dark">
                            {
                                thField.map((name, i) => (<Th Field={name} key={i} />))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) => {
                                return (
                                    <tr key={i} className="hover:bg-secondary border-b">
                                        {
                                            Object.values(renderField).map((needItem, index) => {
                                                if (needItem === "avatar") return <TdImg key={index} FieldValue={item[needItem]} />
                                                if (needItem === "hash") return <TdHash key={index} hash={i + 1} />
                                                if (needItem === "permition") return <TdModel key={index} />
                                                if (needItem !== "_id") return <Td key={index} FieldValue={item[needItem]} />
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
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
                    <button>
                        Previous
                    </button>
                    <button>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DataTable);


const Th = React.memo(({ Field }) => (
    <th className="py-2 text-start font-inter text-sm px-4">
        {Field}
    </th>
))

const TdHash = React.memo(({ hash }) => (
    <th className="py-2 text-start font-inter text-sm px-4">
        {hash}
    </th>
))

const Td = React.memo(({ FieldValue }) => (
    <td className="text-xs font-inter py-2 px-4">{FieldValue}</td>
))

const TdImg = React.memo(({ FieldValue }) => (
    <td className="text-xs py-2 px-4">
        <img
            src={FieldValue}
            alt={FieldValue}
            className="w-10 h-10 rounded-full object-fill"
        />
    </td>
))

const TdModel = React.memo(() => (
    <td>
        <Model lable="Permission" modelInsideBtn="Deny" ModelOutSideBtn="Action">
            <p>Congratulaton! It's Working Bro..</p>
        </Model>
    </td>
))