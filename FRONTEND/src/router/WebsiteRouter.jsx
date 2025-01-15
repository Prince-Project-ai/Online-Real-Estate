import React from "react";
import WebsiteLayouts from "../layouts/WebsiteLayouts";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/website/Home";
// import Home from "../Pages/website/Home";
import SearchResult from "../Pages/website/SearchResult";
import Header from "../Components/website/comman/Header";
import Footer from "../Components/website/comman/Footer";
import Counter from "../Components/website/Counter";
import Profile from "../Pages/website/Profile";
import WebsiteContextStackProvider from "../Contexts/WebsiteContextStack";
// import NetworkStatus from "../Components/website/comman/NetworkStatus";

const WebsiteRouter = () => {
  return (
    <WebsiteContextStackProvider>
      <WebsiteLayouts>
        {/* <NetworkStatus /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/local" element="<h2>Hello this is main route of the websiteroouter</h2>" />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
        <Footer />
      </WebsiteLayouts>
    </WebsiteContextStackProvider>
  );
};

export default WebsiteRouter;
