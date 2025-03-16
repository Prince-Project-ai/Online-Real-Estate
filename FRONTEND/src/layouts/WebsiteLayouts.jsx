import React, { lazy, Suspense } from "react";
import HeaderSkeleton from "../Components/website/comman/HeaderSkeleton";
const Header = lazy(() => import("../Components/website/comman/Header"));
const Footer = lazy(() => import("../Components/website/comman/Footer"));


const WebsiteLayouts = ({ children }) => {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      {children}
      <Suspense fallback={<p>Footer is Loading...</p>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default WebsiteLayouts;
