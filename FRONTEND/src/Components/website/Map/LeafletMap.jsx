import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ping from "../../../assets/Website/ping.png";

// Define the custom icon
const customIcon = L.icon({
    iconUrl: ping,
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32], // Position of the popup relative to the icon
});

const LeafletMap = ({ latitude, longitude }) => {
    return (
        <div className="h-screen">
            <MapContainer
                center={[latitude, longitude]} // Set dynamic coordinates as the map's center
                zoom={50} // Initial zoom level
                scrollWheelZoom={true} // Enable zoom with the mouse wheel
                className="h-[500px] w-full"
            >
                {/* Google Maps Satellite TileLayer */}
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    attribution="&copy; <a href='https://www.google.com/maps'>Google Maps</a>"
                    maxZoom={20}
                />
                {/* Marker with a custom icon */}
                <Marker position={[latitude, longitude]} icon={customIcon}>
                    <Popup>
                        This is a custom icon marker! <br /> Latitude: {latitude}, Longitude: {longitude}.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default LeafletMap;
