import React from "react";
import HeroFilter from "../../Components/website/HeroFilter";
let i = 0;
const Home = () => {
  return (
    <>
      <p>Render : {i++}</p>
      <main>
        {/* HERO SECTION  */}
        <section className="hero-section bg-body py-16 border-b bg-grid-pattern bg-grid-size">
          <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col-reverse lg:flex-row items-center gap-2">
            <div className="w-full text-center">
              <h1 className="text-4xl md:text-6xl font-heading text-dark mb-6">
                Discover Your Perfect Property with PropertiFy
              </h1>
              <div className="mb-10">
                <p className="text-lg max-w-4xl mx-auto md:text-xl font-description text-secondary ">
                  Find houses, shops, plots, and farmhouses near you or anywhere you desire. Your dream property is just a click away!
                </p>
              </div>
              <div className="mb-8">
                <button className="bg-dark text-white px-6 py-3  hover:bg-gray-800 transition duration-300">
                  <i className="ri-building-2-fill me-1"></i> Explore Now
                </button>
                <button className="ml-4 bg-secondary text-dark px-6 py-3  hover:bg-gray-300 transition duration-300">
                  <i className="ri-building-fill me-1"></i> List Your Property
                </button>
              </div>
              {/* here add the hero filter componnet  */}
              <HeroFilter />
            </div>
          </div>
        </section>
        <section className="property-categories border-b bg-body py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-4xl font-heading text-dark mb-1">
                Explore Properties by Category
              </h2>
              <p className="text-lg max-w-xl mx-auto md:text-base font-description text-secondary">
                Whether you're looking for a cozy home, a commercial space, or investment opportunities, we have it all!
              </p>
              <hr className="max-w-36 border-dark border rounded mx-auto bg-dark mt-3" />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Houses */}
              {/* Houses */}
              <div className="bg-secondary p-6 rounded-md hover:border-2 border-2 hover:border-dark transition-shadow duration-300 flex items-center gap-4">
                <i className="ri-home-4-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-2xl font-primary text-dark mb-2">Houses</h3>
                  <p className="text-md font-description text-dark">
                    Perfect for families and individuals.
                  </p>
                </div>
              </div>

              {/* Shops */}
              <div className="bg-secondary p-6 rounded-md hover:border-2 border-2 hover:border-dark transition-shadow duration-300 flex items-center gap-4">
                <i className="ri-store-2-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-2xl font-primary text-dark mb-2">Shops</h3>
                  <p className="text-md font-description text-dark">
                    Find the ideal space for your business.
                  </p>
                </div>
              </div>

              {/* Plots */}
              <div className="bg-secondary p-6 rounded-md hover:border-2 border-2 hover:border-dark transition-shadow duration-300 flex items-center gap-4">
                <i className="ri-map-pin-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-2xl font-primary text-dark mb-2">Plots</h3>
                  <p className="text-md font-description text-dark">
                    Explore land for your next big idea.
                  </p>
                </div>
              </div>

              {/* PGs */}
              <div className="bg-secondary p-6 rounded-md hover:border-2 border-2 hover:border-dark transition-shadow duration-300 flex items-center gap-4">
                <i className="ri-hotel-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-2xl font-primary text-dark mb-2">PGs</h3>
                  <p className="text-md font-description text-dark">
                    Affordable accommodations for students and professionals.
                  </p>
                </div>
              </div>

              {/* Farmhouses */}
              <div className="bg-secondary p-6 rounded-md hover:border-2 border-2 hover:border-dark transition-shadow duration-300 flex items-center gap-4">
                <i className="ri-home-smile-2-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-2xl font-primary text-dark mb-2">Farmhouses</h3>
                  <p className="text-md font-description text-dark">
                    Luxurious retreats for events and relaxation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-body py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-4xl font-heading text-dark mb-2">
                Why Propertify?
              </h2>
              <p className="text-lg font-description text-secondary">
                Discover the unique advantages of using Propertify for all your property needs.
              </p>
              <hr className="max-w-36 border-dark border rounded mx-auto bg-dark mt-3" />
            </div>

            {/* Points Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Point 1 */}
              <div className="flex items-start gap-4 bg-secondary p-6 transition border-2 border-dashed hover:border-dark duration-300">
                <i className="ri-shield-check-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">Verified Listings</h3>
                  <p className="text-md font-description text-dark">
                    Only trusted properties from reliable owners.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex border-2 border-dashed hover:border-dark items-start gap-4 bg-secondary p-6 transition duration-300">
                <i className="ri-voiceprint-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">
                    Seamless Communication
                  </h3>
                  <p className="text-md font-description text-dark">
                    Chat and call directly with property owners.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex border-2 border-dashed hover:border-dark items-start gap-4 bg-secondary p-6 transition duration-300">
                <i className="ri-filter-2-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">Advanced Filters</h3>
                  <p className="text-md font-description text-dark">
                    Find exactly what you’re looking for with ease.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex border-2 border-dashed hover:border-dark items-start gap-4 bg-secondary p-6 hover:shadow-lg transition duration-300">
                <i className="ri-map-pin-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">Location-Based Search</h3>
                  <p className="text-md font-description text-dark">
                    Discover properties near your location with geolocation support.
                  </p>
                </div>
              </div>

              {/* Point 5 */}
              <div className="flex border-2 border-dashed hover:border-dark items-start gap-4 bg-secondary p-6  hover:shadow-lg transition duration-300">
                <i className="ri-user-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">User-Friendly Dashboard</h3>
                  <p className="text-md font-description text-dark">
                    Manage properties, inquiries, and approvals with an intuitive dashboard.
                  </p>
                </div>
              </div>

              {/* Point 6 */}
              <div className="flex border-2 border-dashed hover:border-dark items-start gap-4 bg-secondary p-6 hover:shadow-lg transition duration-300">
                <i className="ri-secure-payment-line text-4xl text-dark"></i>
                <div>
                  <h3 className="text-xl font-primary text-dark mb-2">Secure Transactions</h3>
                  <p className="text-md font-description text-dark">
                    Ensure safe and hassle-free payments with verified methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-body border-t py-16">
          <div className="w-full mx-auto px-2">
            {/* Heading and Description */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-heading text-dark mb-4">
                Properties Near You
              </h2>
              <p className="text-lg font-description text-secondary">
                Discover properties closest to your current location and start your journey today.
              </p>
            </div>

            {/* Map and Property Pins */}
            <div className="relative h-[650px] w-full rounded-md shadow-lg overflow-hidden">
              {/* Replace iframe with an interactive map component like Google Maps or Leaflet */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093746!2d-122.41941548468153!3d37.77492977975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818d3e255a3d%3A0x4b0b1c1df3e637b6!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sin!4v1685097123456!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full border-0"
                title="Map of Nearby Properties"
              ></iframe> */}
            </div>

            {/* Map Integration Instructions */}
            <div className="mt-6 text-center">
              <p className="text-md font-description text-secondary">
                Click on the property pins on the map to explore more details about properties near you.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
