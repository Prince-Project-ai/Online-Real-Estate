import React from "react";

const TdImg = ({ FieldValue }) => {
    return (
        <td className="text-xs py-2 px-4">
            <img
                src={FieldValue}
                alt={FieldValue}
                className="w-10 h-10 rounded-full object-fill"
            />
        </td>
    );
};

export default React.memo(TdImg);
