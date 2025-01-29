import React from "react";
import Model from "../Model";

const TdModel = ({ lable, modelInsideBtn, ModelOutSideBtn, children }) => {
    return (
        <td>
            <Model lable={lable} modelInsideBtn={modelInsideBtn} ModelOutSideBtn={ModelOutSideBtn}>
                {children}
            </Model>
        </td>
    );
};

export default React.memo(TdModel);
