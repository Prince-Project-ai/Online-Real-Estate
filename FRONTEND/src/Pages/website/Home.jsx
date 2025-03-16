import React, { useCallback, useEffect, lazy, Suspense } from "react";
import { useSharedData } from "../../Contexts/SharedDataContext";
import { showAllProperty } from "../../Api/website/HandleUserApi";
const SearchResult = lazy(() => import("./SearchResult"));
const HeroSection = lazy(() => import("./HeroSection"));

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
      <Suspense fallback={<p className="min-h-screen bg-secondary text-center">Loading</p>}>
        <HeroSection />
      </Suspense>

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




// Skeleton Loader for Search Results
export const SearchResultLoader = () => (
  <div className="h-72 w-full bg-gray-200 animate-pulse flex items-center justify-center">
    <p className="text-gray-500">Loading properties...</p>
  </div>
);