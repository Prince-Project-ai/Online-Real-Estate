import React from "react";

const DataTable = ({ thField, children }) => {

    return (
        <>
            {/* Table */}
            {/* Top Controls */}

            <div className="overflow-x-auto" >
                <table className=" w-full border-collapse bg-white rounded-lg overflow-hidden">
                    <thead className="border">
                        <tr className="bg-secondary text-dark">
                            {
                                thField.map((name, i) => (<Th Field={name} key={i} />))
                            }
                        </tr>
                    </thead>
                    <tbody className="border">
                        {children}
                    </tbody>
                </table>
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