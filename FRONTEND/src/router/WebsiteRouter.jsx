import React, { lazy, Suspense } from "react";
import WebsiteLayouts from "../layouts/WebsiteLayouts";
import { Routes, Route, Navigate } from "react-router-dom";
import WebsiteContextStackProvider from "../Contexts/WebsiteContextStack";
import { useAuth } from "../Contexts/AuthContext";
import Home from "../Pages/website/Home";
const PropertyDetails = lazy(() => import("../Pages/website/PropertyDetails"));
const FullMapFIlter = lazy(() => import("../Pages/website/FullMapFIlter"));
const Profile = lazy(() => import("../Pages/website/Profile"));

const WebsiteRouter = () => {
    return (
        <WebsiteContextStackProvider>
            <Routes>
                <Route path="/" element={<WebsiteLayouts><Home /></WebsiteLayouts>} />
                <Route path="/profile" element={
                    <PrivateRouter>
                        <WebsiteLayouts>
                            <Suspense fallback={<p>Profile Page is Loading...</p>}>
                                <Profile />
                            </Suspense>
                        </WebsiteLayouts>
                    </PrivateRouter>
                } />
                <Route path="/fullmap-filter" element={
                    <PrivateRouter>
                        <WebsiteLayouts>
                            <Suspense fallback={<h2>Loading map...</h2>}>
                                <FullMapFIlter />
                            </Suspense>
                        </WebsiteLayouts>
                    </PrivateRouter>
                } />
                <Route path="/property-details/:data" element={
                    <PrivateRouter>
                        <WebsiteLayouts>
                            <Suspense fallback={<h2>Loading Properties...</h2>}>
                                <PropertyDetails />
                            </Suspense>
                        </WebsiteLayouts>
                    </PrivateRouter>
                } />
                {/* 404 Page Outside of WebsiteLayouts */}
                <Route path="*" element="Page Not Found" />
            </Routes>
        </WebsiteContextStackProvider>
    );
};

const PrivateRouter = ({ children }) => {
    const { isLoading, isAuthenticated, currentAuth } = useAuth();
    if (isLoading) return <p>Loading Profile...</p>;
    if (!isAuthenticated || currentAuth?.role !== "User") return <Navigate to="/" replace />;
    return children;
}

export default React.memo(WebsiteRouter);
