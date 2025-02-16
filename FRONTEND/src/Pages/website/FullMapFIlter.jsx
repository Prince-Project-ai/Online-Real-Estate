import React, { useEffect, useState, useCallback, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { showAllProperty } from "../../Api/website/HandleUserApi";
import { useMessage } from "../../Contexts/MessageContext";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};


/* .gm-style-iw-chr {
  display: none;
} */

// const gm-style-iw-d = {
//   overflow - y: auto!important;
//   height: auto!important;
//   max - height: 100 % !important;
//   padding - bottom: 0px!important;
//   border: 2px solid red;
// }


const defaultCenter = {
  lat: 21.6015, // Default Center (amreli)
  lng: 71.2204,
};

const FullMapFilter = () => {
  const { showToast } = useMessage();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyList, setPropertyList] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await showAllProperty();
      if (response?.success) {
        showToast(response?.message, "success");
        setPropertyList(response?.data || []);
      }
    } catch (error) {
      showToast(error?.response?.data?.message || "Error fetching properties", "error");
    }
  };

  const handleMarkerClick = useCallback((property) => {
    setSelectedProperty(property);
  }, []);

  const handleCloseClick = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Memoize the property list to avoid unnecessary calculations
  const markers = useMemo(
    () =>
      propertyList.map((property, i) => {
        const location = property?.location?.locationCode?.[0];
        if (!location?.latitude || !location?.longitude) return null;

        return (
          <Marker
            key={i}
            position={{ lat: location.latitude, lng: location.longitude }}
            onClick={() => handleMarkerClick(property)}
          />
        );
      }),
    [propertyList, handleMarkerClick]
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyC5oArfQeCOs0SeDNFzm7bCF5htor89riI">
      <GoogleMap
        // className="h-[calc(100vh-theme(space.4))] overflow-auto"
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter} // Prevents map reset
        zoom={8}
        onLoad={onMapLoad}
        options={{
          zoomControl: true, // Enables zoom buttons
          mapTypeControl: true, // Enables switching between Map and Satellite
          streetViewControl: true, // Enables street view pegman
          fullscreenControl: true, // Enables fullscreen button
        }}
      >
        {markers}

        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty.location.locationCode[0].latitude,
              lng: selectedProperty.location.locationCode[0].longitude,
            }}
            onCloseClick={handleCloseClick}
            className="border border-dark"
          >
            <div className="max-w-72 w-full border border-dark bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Property Image */}
              <div className="relative w-full h-44">
                <img
                  src={selectedProperty.images?.[0]?.propertyImages || "https://via.placeholder.com/300"}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-dark text-white text-xs px-2 font-inter py-1 rounded-lg shadow-md">
                  {selectedProperty.listingType}
                </span>
              </div>

              {/* Property Details */}
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedProperty.propertyTitle}
                </h3>
                <p className="text-sm text-gray-500">{selectedProperty.propertyType}</p>
                <p className="text-xl font-bold text-dark">
                  ₹{selectedProperty.price.toLocaleString()}
                </p>

                {/* Interactive Buttons */}
                <div className="flex items-center justify-between mt-1">
                  <button
                    // rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-white bg-dark rounded-lg transition-all duration-300"
                  >
                    Details
                  </button>
                  <button
                    onClick={handleCloseClick}
                    className="px-3 py-2 text-gray-600 hover:text-red-500 transition-all duration-300"
                  >
                    ✖
                  </button>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}

      </GoogleMap>
    </LoadScript>
  );
};

export default FullMapFilter;
