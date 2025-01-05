import React from "react";
import WebsiteLayouts from "../layouts/WebsiteLayouts";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/website/Home";
// import Home from "../Pages/website/Home";
import SearchResult from "../Pages/website/SearchResult";
import Header from "../Components/website/comman/Header";
import Footer from "../Components/website/comman/Footer";
import Counter from "../Components/website/Counter";

const WebsiteRouter = () => {
  return (
    <WebsiteLayouts>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local" element="<h2>Hello this is main route of the websiteroouter</h2>" />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      <Footer />
    </WebsiteLayouts>
  );
};

export default WebsiteRouter;
