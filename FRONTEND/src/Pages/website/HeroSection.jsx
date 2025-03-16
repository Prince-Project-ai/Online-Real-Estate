import React, { lazy, Suspense } from "react";
const HeroFilter = lazy(() => import("../../Components/website/HeroFilter"));


const HeroSection = () => {
  return (
    <>
      <section className="hero-section bg-body py-16 border-b bg-grid-pattern bg-grid-size">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col-reverse lg:flex-row items-center gap-2">
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-6xl text-dark mb-6 font-heading">
              Discover Your Perfect Property with PropertiFy
            </h1>
            <p className="text-lg max-w-4xl mx-auto md:text-xl font-description text-secondary mb-10">
              Find houses, shops, plots, and farmhouses near you or anywhere you desire. Your dream property is just a click away!
            </p>
            {/* <div className="mb-8">
                    <button className="bg-dark text-white px-6 py-3 hover:bg-gray-800 transition duration-300">
                      < Explore Now
                    </button>
                    <button className="ml-4 bg-secondary text-dark px-6 py-3 hover:bg-gray-300 transition duration-300">
                      <i className="ri-building-fill me-1"></i> List Your Property
                    </button>
                  </div> */}

            {/* Hero Filter */}
            <Suspense fallback={<HeroFilterLoader />}>
              <HeroFilter />
            </Suspense>
          </div>
        </div>
      </section>

    </>
  );
};

export default HeroSection;

export const HeroFilterLoader = () => (
  <div className="w-full py-12 flex justify-center">
    <div className="h-12 w-3/4 bg-gray-200 animate-pulse"></div>
  </div>
);
