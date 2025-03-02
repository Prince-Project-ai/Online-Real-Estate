import React, { useMemo, useState } from "react";
import house from "../../../assets/sellerDashboard/house.png";
import pg from "../../../assets/sellerDashboard/pg.png";
import building from "../../../assets/sellerDashboard/appartment.png";
import Sizing from "./Sizing";

const PropertyType = ({ handleChange, formData, formErrors }) => {
  const propertyTypes = useMemo(
    () => [
      { icon: house, type: "House" },
      { icon: pg, type: "PG" },
      { icon: building, type: "Apartment" },
    ],
    []
  );

  const categoryType = useMemo(() => ["Sell", "Rent"], []);
  const [isOpenToggle, setIsOpenToggle] = useState(false);

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-description font-semibold mb-3">Property Type</h2>
      <div className="space-y-3 sm:space-y-4">
        {/* Property Title */}
        <div>
          <label htmlFor="propertyTitle" className="block font-semibold text-sm sm:text-base">
            Property Title*
          </label>
          <input
            type="text"
            id="propertyTitle"
            name="propertyTitle"
            value={formData.propertyTitle}
            onChange={handleChange}
            placeholder="Enter property title"
            className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide mt-1"
          />
          {formErrors.propertyTitle && <p className="text-red-500 text-xs mt-1">{formErrors.propertyTitle}</p>}
        </div>

        {/* Category Type */}
        <div>
          <label className="block font-semibold text-sm sm:text-base">Category*</label>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
            {categoryType.map((category, i) => (
              <label key={i} className="cursor-pointer">
                <input
                  type="radio"
                  name="listingType"
                  value={category}
                  checked={formData.listingType === category}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className={`border block text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-3 rounded-full ${formData.listingType === category ? "bg-secondary border-dark" : ""}`}>
                  {category} Property
                </span>
              </label>
            ))}
          </div>
          {formErrors.listingType && <p className="text-red-500 text-xs mt-1">{formErrors.listingType}</p>}
        </div>

        {/* Property Type Selection */}
        <div>
          <label className="block font-semibold text-sm sm:text-base">Property Type*</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {propertyTypes.map((property, i) => (
              <label key={i} htmlFor={property.type} className={`cursor-pointer flex flex-col items-center gap-2 rounded-lg border p-2 sm:p-3 w-full text-center ${formData.propertyType === property.type ? "bg-secondary border-dark" : ""}`}>
                <input
                  type="radio"
                  id={property.type}
                  name="propertyType"
                  value={property.type}
                  checked={formData.propertyType === property.type}
                  onChange={handleChange}
                  className="hidden"
                />
                <img src={property.icon} alt={property.type} className="w-10 sm:w-12 h-10 sm:h-12 object-contain" />
                <span className="text-xs sm:text-sm text-dark">{property.type}</span>
              </label>
            ))}
          </div>
          {formErrors.propertyType && <p className="text-red-500 text-xs mt-1">{formErrors.propertyType}</p>}
        </div>

        {/* Property Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="w-full">
            <label htmlFor="price" className="block font-semibold text-sm sm:text-base">
              Property Price*
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide ps-8"
              />
              <i className="ri-money-rupee-circle-line absolute left-2 top-1/2 -translate-y-1/2 text-dark/50 text-lg sm:text-xl"></i>
            </div>
            {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
          </div>

          {/* Price Negotiable Toggle */}
          <div className="w-full self-start">
            <label className="block font-semibold text-sm sm:text-base">Price Negotiable</label>
            <div
              onClick={() => setIsOpenToggle((prev) => !prev)}
              className={`cursor-pointer w-14 sm:w-16 h-7 sm:h-8 p-1 rounded-full mt-2 flex items-center ${isOpenToggle ? "bg-green-500" : "bg-secondary"}`}
            >
              <span className={`bg-white w-6 h-6 rounded-full transition-all duration-300 ${isOpenToggle ? "ml-auto" : ""}`}></span>
            </div>
          </div>
        </div>

        {/* Sizing Component */}
        <div>
          <Sizing formData={formData} handleChange={handleChange} formErrors={formErrors} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PropertyType);