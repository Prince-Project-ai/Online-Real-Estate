import React from "react";
import MarkerLocation from "./MarkerMap/MarkerLocation";

const LocationDetails = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-description font-semibold mb-2">Location Details</h2>
            <div className="grid lg:grid-cols-2 grid-col-1 gap-4">
                {/* <div>
                    <label htmlFor="Country" className="tracking-wide font-semibold text-sm">Country*</label>
                    <input
                        type="text"
                        id="Country"
                        name="country"
                        value="india"
                        readOnly
                        disabled
                        placeholder="Property Title"
                        className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out   font-description tracking-wide"
                    />
                </div> */}
                <div>
                    <label htmlFor="state" className="tracking-wide font-semibold text-sm">State*</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value="Gujarat"
                        readOnly
                        disabled
                        placeholder="Property Title"
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                <div>
                    <label htmlFor="District" className="tracking-wide font-semibold text-sm">District*</label>
                    <input
                        type="text"
                        id="District"
                        name="district"
                        value="Amreli"
                        disabled
                        readOnly
                        placeholder="Property Title"
                        className="w-full p-2 text-sm border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                <div className="col-span-2">
                    <label htmlFor="Street address" className="tracking-wide font-semibold text-sm">Street address*</label>
                    <input
                        type="text"
                        id="propertyTitle"
                        name="propertyTitle"
                        value={formData.propertyTitle}
                        onChange={handleChange}
                        placeholder="Street address"
                        className="w-full text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                <div>
                    <label htmlFor="Latitude" className="tracking-wide font-semibold text-sm">Latitude*</label>
                    <input
                        type="number"
                        id="Latitude"
                        name="latitude"
                        value={formData.latitude}
                        placeholder="Latitude"
                        min={0}
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                <div>
                    <label htmlFor="Longitude" className="tracking-wide font-semibold text-sm">Longitude*</label>
                    <input
                        type="number"
                        id="Longitude"
                        name="longitude"
                        value={formData.longitude}
                        placeholder="Longitude"
                        min={0}
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                <div className="col-span-2">
                    <label htmlFor="location-link" className="tracking-wide font-semibold text-sm">Location Link*</label>
                    <input
                        type="text"
                        id="location-link"
                        name="locationLink"
                        value=""
                        placeholder="Past Google Location link here"
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                {/* Add other fields similarly */}
                <div className="col-span-2 h-[350px]">
                    <MarkerLocation />
                </div>
            </div>
        </div>
    );
};

export default React.memo(LocationDetails);