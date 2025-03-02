import React, { useRef } from "react";

const MediaUpload = ({ formData, handleChange, previewImages, formErrors, setPreviewImages }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
  };

  return (
    <div>
      <h2 className="text-xl font-description font-semibold">Photos and videos</h2>
      <p className="pb-1 text-zinc-500">
        The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first.
      </p>
      <hr />
      <div className="border rounded-lg p-4 mt-4">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden main-cover-block w-full h-[200px] group">
              <img src={image} className="z-0 w-full h-full object-cover rounded-lg border" alt={`preview-${index}`} />
              <div className="z-[2] absolute rounded-lg inset-0 bg-dark/30 flex items-center justify-center -translate-x-full group-hover:translate-x-0 transition-transform duration-200">
                <button
                  className="w-10 h-10 bg-white rounded-md flex items-center justify-center"
                  onClick={() => handleDeleteImage(index)}
                >
                  <i className="ri-delete-bin-line text-red-500"></i>
                </button>
              </div>
            </div>
          ))}
          <div className="file-choose-block w-full h-[200px]">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              name="propertyImages"
              accept="image/*"
              onChange={handleChange}
              multiple
            />
            {formErrors.propertyImages && <p className="text-red-500 text-xs">{formErrors.propertyImages}</p>}

            {/* Upload Button */}
            <button
              className="bg-secondary h-full w-full rounded-lg border-dashed border border-dark cursor-pointer flex flex-col justify-center items-center"
              onClick={handleButtonClick}
            >
              <i className="ri-upload-2-fill text-3xl"></i>
              Upload photos
            </button>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="location-link" className="tracking-wide font-semibold text-sm">Video Link *</label>
          <input
            id="location-link"
            placeholder="Paste YouTube video link here"
            className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
            type="url"
            onChange={handleChange}
            value={formData.propertyVideo}
            name="propertyVideo"
          />
          {formErrors.propertyVideo && <p className="text-red-500 text-xs">{formErrors.propertyVideo}</p>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MediaUpload);
