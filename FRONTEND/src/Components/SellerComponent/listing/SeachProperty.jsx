import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyC5oArfQeCOs0SeDNFzm7bCF5htor89riI";

const SeachProperty = ({ setFormData, formErrors }) => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center (India)
    const autocompleteRef = useRef(null);


    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address,
            };
            setAddress(newLocation.address);

            setLocation(newLocation); // Update map center & marker position

            setFormData((prev) => ({
                ...prev,
                location: {
                    ...prev.location, // Preserve existing fields
                    streetAddress: newLocation.address, // ✅ Use 'address' instead of 'streetAddress'
                    latitude: newLocation.lat, // ✅ Use 'lat' instead of 'latitude'
                    longitude: newLocation.lng, // ✅ Use 'lng' instead of 'longitude'
                }
            }));

        }
    };
    return (
        <>
            <label htmlFor="address" className="tracking-wide font-semibold text-sm">Street address*</label>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect}>
                    <input
                        type="text"
                        id="address"
                        placeholder="Search Address"
                        className="w-full text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark mb-4 duration-200 ease-in-out font-description tracking-wide"
                        value={address}
                        name="streetAddress"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Autocomplete>

                {/* Google Map */}
                <GoogleMap center={location} zoom={15} mapContainerStyle={{ width: "100%", height: "450px" }}>
                    <Marker position={location} />
                </GoogleMap>
            </LoadScript>
            {formErrors?.streetAddress && (
                <p className="text-red-500 text-xs">{formErrors.streetAddress}</p>
            )}
        </>
    );
};

export default React.memo(SeachProperty);