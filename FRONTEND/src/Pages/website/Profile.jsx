import React from "react";
import Breadcrumb from "../../Components/website/comman/Breadcrumb";

const Profile = () => {
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Profile", link: "/profile" },
  ];

  // Sample data for properties
  const savedProperties = [
    {
      id: 1,
      title: "Luxury Apartment in Downtown",
      location: "New York City, NY",
      price: "$1,200,000",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Cozy House in Suburbs",
      location: "Los Angeles, CA",
      price: "$850,000",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  const searchHistory = [
    {
      id: 1,
      title: "2 BHK Apartments",
      filters: "City: San Francisco, Price Range: $500k - $1M",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Villas with Swimming Pool",
      filters: "City: Miami, Bedrooms: 3+",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb paths={breadcrumbPaths} />

        {/* Profile Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h1>

          {/* Basic Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Basic Information</h2>
            <div className="flex items-center space-x-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full shadow"
              />
              <div>
                <p className="text-gray-600">Name: John Doe</p>
                <p className="text-gray-600">Email: john.doe@example.com</p>
                <p className="text-gray-600">Contact: +1234567890</p>
              </div>
            </div>
          </section>

          {/* Saved Properties */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Saved Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white border rounded-lg shadow overflow-hidden"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{property.title}</h3>
                    <p className="text-gray-600">{property.location}</p>
                    <p className="text-gray-800 font-semibold mt-2">{property.price}</p>
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Property Search History */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Property Search History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchHistory.map((search) => (
                <div
                  key={search.id}
                  className="bg-white border rounded-lg shadow overflow-hidden"
                >
                  <img
                    src={search.image}
                    alt={search.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{search.title}</h3>
                    <p className="text-gray-600">{search.filters}</p>
                    <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                      Repeat Search
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Edit Profile */}
          <section>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
