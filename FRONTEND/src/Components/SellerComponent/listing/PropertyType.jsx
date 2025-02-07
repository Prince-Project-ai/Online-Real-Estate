import React, { useMemo, useState } from "react";
import house from "../../../assets/sellerDashboard/house.png";
import pg from "../../../assets/sellerDashboard/pg.png";
import building from "../../../assets/sellerDashboard/appartment.png";
import Sizing from "./Sizing";

const PropertyType = ({ handleChange, formData, formErrors }) => {

  const propertyTypes = useMemo(() => [
    { icon: house, type: "House" },
    { icon: pg, type: "PG" },
    { icon: building, type: "Apartment" },
  ], []);

  const categoryType = useMemo(() => ["Sell", "Rent"], []);

  const [isOpenToggle, setIsOpenToggle] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-description font-semibold mb-4">Property Type</h2>
      <div className="space-y-4">

        {/* Property Title */}
        <div>
          <label htmlFor="propertyTitle" className="tracking-wide font-semibold text-sm">
            Property Title*
          </label>
          <input
            type="text"
            id="propertyTitle"
            name="propertyTitle"
            value={formData.propertyTitle}
            onChange={handleChange}
            placeholder="Property Title"
            className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 font-description tracking-wide"
          />
          {formErrors.propertyTitle && <p className="text-red-500 text-xs mt-1">{formErrors.propertyTitle}</p>}
        </div>

        {/* Category Type */}
        <div>
          <label className="tracking-wide font-semibold text-sm">Category*</label>
          <div className="space-x-4 mt-1">
            {categoryType.map((category, i) => (
              <label key={i} className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="listingType"
                  value={category}
                  checked={formData.listingType === category}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className={`border block text-xs px-5 py-3 rounded-full ${formData.listingType === category ? "bg-secondary border-dark" : ""}`}>
                  {category} Property
                </span>
              </label>
            ))}
          </div>
          {formErrors.listingType && <p className="text-red-500 text-xs mt-1">{formErrors.listingType}</p>}
        </div>

        {/* Property Type Selection */}
        <div>
          <label className="font-semibold text-sm">Property Type*</label>
          <div className="flex space-x-3 mt-1 flex-wrap">
            {propertyTypes.map((property, i) => (
              <label key={i} htmlFor={property.type} className={`${formData.propertyType === property.type ? 'bg-secondary border-dark' : ''} cursor-pointer flex flex-col items-center gap-2 rounded-lg border  p-3 w-28 text-center`}>
                <input
                  type="radio"
                  id={property.type}
                  name="propertyType"
                  value={property.type}
                  checked={formData.propertyType === property.type}
                  onChange={handleChange}
                  className="hidden"
                />
                <img src={property.icon} alt={property.type} className="w-12 h-12 object-contain" />
                <span className="text-sm text-dark">{property.type}</span>
              </label>
            ))}
          </div>
          {formErrors.propertyType && <p className="text-red-500 text-xs mt-1">{formErrors.propertyType}</p>}
        </div>

        {/* Property Price */}
        <div className="flex items-center gap-x-4">
          <div className="w-full">
            <label
              htmlFor="price"
              className="tracking-wide font-semibold text-sm"
            >
              Property Price*
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Property Price"
                className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide pl-9"
              />
              <i className="ri-money-rupee-circle-line absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xl"></i>
            </div>
            {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
          </div>

          <div className="w-full self-start">
            <label className="tracking-wide font-semibold text-sm">
              Price Negotiable
            </label>
            <div
              onClick={() => setIsOpenToggle((prev) => !prev)}
              className={`${isOpenToggle ? 'bg-green-500' : 'bg-secondary'
                } cursor-pointer w-16 h-8 p-1 rounded-full mt-2`}
            >
              <span
                className={`bg-white w-6 ${isOpenToggle ? 'ms-auto' : ""
                  } rounded-full h-full block`}
              ></span>
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
