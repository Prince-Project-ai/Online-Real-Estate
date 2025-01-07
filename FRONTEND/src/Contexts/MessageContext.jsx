import { createContext, useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
export const MessageContext = createContext();
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error("MessageContext must be inside the message provider.")
  return context;
}
const MessageProvider = ({ children }) => {
  const showToast = (message, type) => {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  }
  const contextValue = {
    showToast,
  }
  return (
    <MessageContext.Provider value={contextValue}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </MessageContext.Provider>
  )
}
export default MessageProvider;