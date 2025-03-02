import React, { useState, useRef, useCallback } from "react";
import { LoadScript, Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyC5oArfQeCOs0SeDNFzm7bCF5htor89riI"; // Replace with env variable in production

const SearchProperty = ({ setFormData, formErrors }) => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center (India)
    const autocompleteRef = useRef(null);

    // Handle place selection
    const handlePlaceSelect = useCallback(() => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry) {
            const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address,
            };

            setAddress(newLocation.address);
            setLocation({ lat: newLocation.lat, lng: newLocation.lng });

            setFormData((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                    streetAddress: newLocation.address,
                    latitude: newLocation.lat,
                    longitude: newLocation.lng,
                }
            }));
        }
    }, [setFormData]);

    return (
        <div className="w-full">
            <label htmlFor="address" className="block text-sm font-semibold tracking-wide mb-2">
                Street Address*
            </label>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect}>
                    <input
                        type="text"
                        id="address"
                        placeholder="Search Address"
                        className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-dark focus:border-dark mb-4 text-sm tracking-wide"
                        value={address}
                        name="streetAddress"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Autocomplete>

                {/* Google Map Container */}
                <div className="w-full h-[350px] md:h-[450px] rounded-lg overflow-hidden">
                    <GoogleMap center={location} zoom={15} mapContainerClassName="w-full h-full">
                        <Marker position={location} />
                    </GoogleMap>
                </div>
            </LoadScript>

            {formErrors?.streetAddress && (
                <p className="text-red-500 text-xs mt-1">{formErrors.streetAddress}</p>
            )}
        </div>
    );
};

export default React.memo(SearchProperty);
