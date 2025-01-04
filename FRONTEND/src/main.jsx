import { StrictMode } from "react";
import "remixicon/fonts/remixicon.css";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import MessageProvider from "./Contexts/MessageContext.jsx";

createRoot(document.getElementById('PropertyFy')).render(
  <StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </StrictMode>,
)
