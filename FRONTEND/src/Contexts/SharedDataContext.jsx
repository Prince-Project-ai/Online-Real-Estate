import { createContext, useContext, useState } from "react";

export const SharedDataContext = createContext();

export const useSharedData = () => {
    const context = useContext(SharedDataContext);
    if (!context) throw new Error("data context must be used inside of data provider");
    return context;
}

const SharedDataProvider = ({ children }) => {

    const [searchFilterData, setSearchFilterData] = useState([]);



    const contextValue = {
        searchFilterData,
        setSearchFilterData,
    }
    return (
        <SharedDataContext.Provider value={contextValue}>
            {children}
        </SharedDataContext.Provider>
    )
}

export default SharedDataProvider;