import { createContext, useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error("MessageContext must be inse message provider.")
  return context;
}

const MessageProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState({ message: null, type: null });

  const showToast = (message, type) => {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }
    setToastMessage({ message, type });
  }

  useEffect(() => {
    const { message, type } = toastMessage;
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
    const timeOutId = setTimeout(() => {
      setToastMessage({ message: null, type: null });
    }, [3000]);

    return () => clearTimeout(timeOutId);
  }, [toastMessage]);

  const contextValue = {
    showToast,
  }

  return (
    <MessageContext.Provider value={contextValue}>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {children}
    </MessageContext.Provider>
  )
}
export default MessageProvider;