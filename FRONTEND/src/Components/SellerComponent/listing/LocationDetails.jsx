import React from "react";
import MarkerLocation from "./MarkerMap/MarkerLocation";

const LocationDetails = ({ formData, handleChange, formErrors }) => {
    console.log(formData);
    return (
        <div>
            <h2 className="text-xl font-description font-semibold mb-2">Location Details</h2>
            <div className="grid lg:grid-cols-2 grid-col-1 gap-4">
                <div>
                    <label htmlFor="Country" className="tracking-wide font-semibold text-sm">Country*</label>
                    <input
                        type="text"
                        id="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        readOnly
                        disabled
                        placeholder="Country"
                        className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out   font-description tracking-wide"
                    />
                </div>
                <div>
                    <label htmlFor="state" className="tracking-wide font-semibold text-sm">State*</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        readOnly
                        disabled
                        placeholder="State"
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                </div>
                <div>
                    <label htmlFor="District" className="tracking-wide font-semibold text-sm">District*</label>
                    <input
                        type="text"
                        id="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="district"
                        className="w-full p-2 text-sm border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                    {formErrors?.district && (
                        <p className="text-red-500 text-xs">{formErrors.district}</p>
                    )}
                </div>
                <div className="col-span-2">
                    <label htmlFor="address" className="tracking-wide font-semibold text-sm">Street address*</label>
                    <input
                        type="text"
                        id="address"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Street address"
                        className="w-full text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                    {formErrors?.streetAddress && (
                        <p className="text-red-500 text-xs">{formErrors?.streetAddress}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="Latitude" className="tracking-wide font-semibold text-sm">Latitude*</label>
                    <input
                        type="number"
                        id="Latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="Latitude"
                        min={0}
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                    {formErrors?.latitude && (
                        <p className="text-red-500 text-xs">{formErrors.district}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="Longitude" className="tracking-wide font-semibold text-sm">Longitude*</label>
                    <input
                        type="number"
                        id="Longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="Longitude"
                        min={0}
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                    {formErrors?.longitude && (
                        <p className="text-red-500 text-xs">{formErrors.longitude}</p>
                    )}
                </div>
                <div className="col-span-2">
                    <label htmlFor="location-link" className="tracking-wide font-semibold text-sm">Location Link*</label>
                    <input
                        type="text"
                        id="location-link"
                        name="address_url"
                        value={formData.address_url}
                        onChange={handleChange}
                        placeholder="Past Google Location link here"
                        className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                    />
                    {formErrors?.address_url && (
                        <p className="text-red-500 text-xs">{formErrors.address_url}</p>
                    )}
                </div>
                {/* Add other fields similarly */}
                <div className="col-span-2 h-[350px]">
                    <MarkerLocation latitude={formData.latitude} longitude={formData.longitude} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(LocationDetails);