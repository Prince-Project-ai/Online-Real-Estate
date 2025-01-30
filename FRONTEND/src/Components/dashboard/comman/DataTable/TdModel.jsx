import React from "react";
import Model from "../Model";

const TdModel = ({ closeModel, children }) => {
    // const handleEvent = (e) => {
    //     const { name, value, type } = e.target;
    //     console.log("Model Remove Button Click", name, value, type);
    // }
    return (
        <td>
            <Model closeModel={closeModel}>
                {children}
            </Model>
        </td>
    );
};

export default React.memo(TdModel);
