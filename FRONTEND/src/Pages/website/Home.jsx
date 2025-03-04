import React, { useCallback, useEffect, lazy, Suspense } from "react";
import { useSharedData } from "../../Contexts/SharedDataContext";
import { showAllProperty } from "../../Api/website/HandleUserApi";

// Lazy Load Components
const HeroFilter = lazy(() => import("../../Components/website/HeroFilter"));
const SearchResult = lazy(() => import("./SearchResult"));

const Home = () => {
  const { searchFilterData, setSearchFilterData } = useSharedData();

  // Fetch property listings
  const fetchAllListings = useCallback(async () => {
    try {
      const response = await showAllProperty();
      if (response?.success) {
        setSearchFilterData(response.data || []);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Error fetching listings");
    }
  }, [setSearchFilterData]);

  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section bg-body py-16 border-b bg-grid-pattern bg-grid-size">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col-reverse lg:flex-row items-center gap-2">
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-6xl font-heading text-dark mb-6">
              Discover Your Perfect Property with PropertiFy
            </h1>
            <p className="text-lg max-w-4xl mx-auto md:text-xl font-description text-secondary mb-10">
              Find houses, shops, plots, and farmhouses near you or anywhere you desire. Your dream property is just a click away!
            </p>
            <div className="mb-8">
              <button className="bg-dark text-white px-6 py-3 hover:bg-gray-800 transition duration-300">
                <i className="ri-building-2-fill me-1"></i> Explore Now
              </button>
              <button className="ml-4 bg-secondary text-dark px-6 py-3 hover:bg-gray-300 transition duration-300">
                <i className="ri-building-fill me-1"></i> List Your Property
              </button>
            </div>

            {/* Hero Filter */}
            <Suspense fallback={<HeroFilterLoader />}>
              <HeroFilter />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <Suspense fallback={<SearchResultLoader />}>
        <SearchResult searchFilterData={searchFilterData} />
      </Suspense>

      {/* Why Propertify Section */}
      <section className="bg-body py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-4xl font-heading text-dark mb-2">Why Propertify?</h2>
            <p className="text-lg font-description text-secondary">
              Discover the unique advantages of using Propertify for all your property needs.
            </p>
            <hr className="max-w-36 border-dark border rounded mx-auto bg-dark mt-3" />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "ri-shield-check-line", title: "Verified Listings", desc: "Only trusted properties from reliable owners." },
              { icon: "ri-voiceprint-line", title: "Seamless Communication", desc: "Chat and call directly with property owners." },
              { icon: "ri-filter-2-line", title: "Advanced Filters", desc: "Find exactly what you’re looking for with ease." },
              { icon: "ri-map-pin-line", title: "Location-Based Search", desc: "Discover properties near your location with geolocation support." },
              { icon: "ri-user-line", title: "User-Friendly Dashboard", desc: "Manage properties, inquiries, and approvals with an intuitive dashboard." },
              { icon: "ri-secure-payment-line", title: "Secure Transactions", desc: "Ensure safe and hassle-free payments with verified methods." },
            ].map((item, index) => (
              <div key={index} className="flex border-2 border-dashed hover:border-dark items-start gap-4 bg-secondary p-6 transition duration-300">
                <i className={`${item.icon} text-4xl text-dark`}></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">{item.title}</h3>
                  <p className="text-md font-description text-dark">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(Home);

// Skeleton Loader for Hero Filter
export const HeroFilterLoader = () => (
  <div className="w-full py-12 flex justify-center">
    <div className="h-12 w-3/4 bg-gray-200 animate-pulse"></div>
  </div>
);

// Skeleton Loader for Search Results
export const SearchResultLoader = () => (
  <div className="h-72 w-full bg-gray-200 animate-pulse flex items-center justify-center">
    <p className="text-gray-500">Loading properties...</p>
  </div>
);