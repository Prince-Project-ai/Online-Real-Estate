import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import MapPing from "../../../../assets/sellerDashboard/MapPing.png";
import { Icon } from "leaflet";

const MarkerLocation = ({ latitude, longitude }) => {
    const customIcon = new Icon({
        iconUrl: MapPing,
        iconSize: [38, 38], // Size of the icon
    });

    return (
        <div className="h-full w-full">
            {
                (latitude && longitude) ? (
                    <MapContainer center={[latitude, longitude]} zoom={13} className="h-full w-full">

                        <LayersControl position="topright">

                            {/* Satellite Map */}
                            <LayersControl.BaseLayer checked name="Satellite Map">
                                <TileLayer
                                    attribution="Google Maps"
                                    url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                    maxZoom={20}
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name="Regular Map">
                                <TileLayer
                                    attribution="Google Maps"
                                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                    maxZoom={20}
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                />
                            </LayersControl.BaseLayer>


                            {/* Terrain Map */}
                            <LayersControl.BaseLayer name="Terrain Map">
                                <TileLayer
                                    attribution="Google Maps"
                                    url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                                    maxZoom={20}
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                />
                            </LayersControl.BaseLayer>

                        </LayersControl>

                        {/* Marker on the map */}
                        <Marker position={[latitude, longitude]} icon={customIcon}>
                            <Popup>Hi, There</Popup>
                        </Marker>

                    </MapContainer>
                ) : (<p className="text-center place-content-center h-full">Please Enter Latitude and Longitude.</p>)
            }

        </div>
    );
};

export default React.memo(MarkerLocation);
