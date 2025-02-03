const MediaUpload = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Upload Images & Videos</h2>
            <div className="space-y-4">
                <input
                    type="file"
                    name="propertyImages"
                    onChange={handleChange}
                    multiple
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="propertyVideo"
                    value={formData.propertyVideo}
                    onChange={handleChange}
                    placeholder="Property Video Link"
                    className="w-full p-2 border rounded"
                />
                {/* Add other fields similarly */}
            </div>
        </div>
    );
};

export default MediaUpload;