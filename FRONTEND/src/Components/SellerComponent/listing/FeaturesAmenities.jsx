const FeaturesAmenities = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
            <div className="space-y-4">
                <label className="block">
                    <input
                        type="checkbox"
                        name="balconyTerrace"
                        checked={formData.balconyTerrace}
                        onChange={handleChange}
                    />
                    Balcony/Terrace
                </label>
                <label className="block">
                    <input
                        type="checkbox"
                        name="swimmingPool"
                        checked={formData.swimmingPool}
                        onChange={handleChange}
                    />
                    Swimming Pool
                </label>
                {/* Add other fields similarly */}
            </div>
        </div>
    );
};

export default FeaturesAmenities;