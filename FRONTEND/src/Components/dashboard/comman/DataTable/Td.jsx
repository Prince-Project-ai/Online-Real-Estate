import React from "react";

const Td = ({ FieldValue }) => {
    return (<td className="text-xs font-inter py-2 px-4">{FieldValue}</td>);
};

export default React.memo(Td);
