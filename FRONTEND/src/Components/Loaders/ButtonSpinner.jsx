import React from "react";
import styles from "./css/ButtonSpinner.module.css";

const ButtonSpinner = () => {
    return (
        <svg viewBox="0 0 16 16" height={20} width={20} className={styles.windows_loading_spinner}>
            <circle r="7px" cy="8px" cx="8px"></circle>
        </svg>
    )
};

export default ButtonSpinner;
