import React, { lazy, Suspense } from "react";
import WebsiteLayouts from "../layouts/WebsiteLayouts";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Pages/website/Profile";
import WebsiteContextStackProvider from "../Contexts/WebsiteContextStack";

const Home = lazy(() => import("../Pages/website/Home"));
const SearchResult = lazy(() => import("../Pages/website/SearchResult"));
const Header = lazy(() => import("../Components/website/comman/Header"));
const Footer = lazy(() => import("../Components/website/comman/Footer"));

const WebsiteRouter = () => {
  return (
    <WebsiteContextStackProvider>
      <WebsiteLayouts>
        <Suspense fallback={<h1>Loading header...</h1>}>
          <Header />
        </Suspense>

        <Routes>

          <Route
            path="/"
            element={
              <Suspense fallback={<h1>Loading home...</h1>}>
                <Home />
              </Suspense>
            }
          />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/local"
            element={
              <h2>Hello, this is the main route of the WebsiteRouter</h2>
            }
          />

          <Route
            path="/search-result"
            element={
              <Suspense fallback={<h2>Loading search results...</h2>}>
                <SearchResult />
              </Suspense>
            }
          />

        </Routes>

        <Suspense fallback={<h1>Loading footer...</h1>}>
          <Footer />
        </Suspense>
      </WebsiteLayouts>
    </WebsiteContextStackProvider>
  );
};

export default WebsiteRouter;
