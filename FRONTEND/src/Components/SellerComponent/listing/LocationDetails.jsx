const LocationDetails = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-2 border rounded"
                />
                {/* Add other fields similarly */}
            </div>
        </div>
    );
};

export default LocationDetails;