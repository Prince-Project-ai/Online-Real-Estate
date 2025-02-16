import React, { lazy, Suspense } from "react";
import WebsiteLayouts from "../layouts/WebsiteLayouts";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Pages/website/Profile";
import WebsiteContextStackProvider from "../Contexts/WebsiteContextStack";
import HeaderSkeleton from "../Components/website/comman/HeaderSkeleton";
import { useAuth } from "../Contexts/AuthContext";
import FullMapFIlter from "../Pages/website/FullMapFIlter";
import PropertyDetails from "../Pages/website/PropertyDetails";

const Home = lazy(() => import("../Pages/website/Home"));
const SearchResult = lazy(() => import("../Pages/website/SearchResult"));
const Header = lazy(() => import("../Components/website/comman/Header"));
const Footer = lazy(() => import("../Components/website/comman/Footer"));

const WebsiteRouter = () => {
    return (
        <WebsiteContextStackProvider>
            <WebsiteLayouts>
                <Suspense fallback={<HeaderSkeleton />}>
                    <Header />
                </Suspense>

                <Routes>
                    <Route path="/" element={<Suspense fallback={<h1>Loading home...</h1>}><Home /></Suspense>} />
                    <Route path="/profile" element={
                        <PrivateRouter>
                            <Profile />
                        </PrivateRouter>
                    } />
                    <Route
                        path="/local"
                        element={<h2>Hello, this is the main route of the WebsiteRouter</h2>}
                    />
                    {/* <Route
                        path="/search-result"
                        element={
                            <PrivateRouter>
                                <Suspense fallback={<h2>Loading search results...</h2>}><SearchResult /></Suspense>
                            </PrivateRouter>
                        }
                    /> */}

                    <Route
                        path="/fullmap-filter"
                        element={
                            <PrivateRouter>
                                <Suspense fallback={<h2>Loading map...</h2>}><FullMapFIlter /></Suspense>
                            </PrivateRouter>
                        }
                    />
                    <Route
                        path="/property-details/:data"
                        element={
                            <PrivateRouter>
                                <Suspense fallback={<h2>Loading Propertys...</h2>}> <PropertyDetails /></Suspense>
                            </PrivateRouter>
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

const PrivateRouter = ({ children }) => {
    const { isLoading, isAuthenticated, currentAuth } = useAuth();
    if (isLoading) return <p>Loading Profile...</p>
    if (!isAuthenticated || currentAuth?.role !== "User") return <Navigate to="/" replace />
    return children;
}

export default WebsiteRouter;

