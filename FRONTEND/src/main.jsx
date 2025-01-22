import { StrictMode } from "react";
import "remixicon/fonts/remixicon.css";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
// import WebsiteContextStackProvider from "./Contexts/WebsiteContextStack.jsx";

createRoot(document.getElementById("PropertyFy")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
