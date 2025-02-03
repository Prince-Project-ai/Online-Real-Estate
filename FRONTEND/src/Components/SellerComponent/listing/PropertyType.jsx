import { useEffect, useMemo, useState } from "react";
import house from "../../../assets/sellerDashboard/house.png";
import pg from "../../../assets/sellerDashboard/pg.png";
import bulding from "../../../assets/sellerDashboard/appartment.png";
// import Sizing from "./Sizing";


const PropertyType = ({ formData, handleChange }) => {
  const propertyTypes = useMemo(() => {
    return [
      {
        icon: house,
        type: "House"
      },
      {
        icon: pg,
        type: "PG"
      },
      {
        icon: bulding,
        type: "Apartment"
      },
    ]

  }, []);

  const [selectedType, setSelectedType] = useState(propertyTypes[0].type);
  const [isOpenToggle, setIsOpenToggle] = useState(false);


  return (
    <div>
      <h2 className="text-xl font-description font-semibold mb-4">Property type</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="propertyTitle" className="tracking-wide font-semibold text-sm">Property Title*</label>
          <input
            type="text"
            id="propertyTitle"
            name="propertyTitle"
            value={formData.propertyTitle}
            onChange={handleChange}
            placeholder="Property Title"
            className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 font-description tracking-wide"
          />
        </div>

        <div>
          <label htmlFor="propertyTitle" className="tracking-wide font-semibold text-sm">Category*</label>
          <div className="space-x-4 mt-1">
            <button className="border border-dark text-xs px-5 py-3 rounded-full bg-secondary">Sell Property</button>
            <button className="border border-dark text-xs px-5 py-3 rounded-full">Rent Property</button>
          </div>
        </div>


        <div>
          <label className="font-semibold text-sm">Property type*</label>
          <div className="flex space-x-3 mt-1 flex-wrap">
            {
              propertyTypes.map((types, i) => (
                <label
                  key={i}
                  htmlFor={types.type}
                  className={`cursor-pointer flex flex-col items-center gap-2 rounded-lg border p-3 transition-all duration-300 w-28 text-center
          ${selectedType === types.type ? "border-dark border-2 bg-secondary" : "border-gray-300 hover:border-dark/60 hover:bg-secondary/20"}
          `}
                >
                  <input
                    type="radio"
                    id={types.type}
                    name="options"
                    value={types.type}
                    checked={selectedType === types.type}
                    onChange={() => setSelectedType(types.type)}
                    className="hidden"
                  />
                  <img src={types.icon} alt={types.type} className="w-10 h-10 object-contain" />
                  <span className="text-sm text-dark font-primary">{types.type}</span>
                </label>
              ))}
          </div>
        </div>

        {/* Add other fields similarly */}
        <div className="flex items-center gap-x-4">
          <div className="w-full">
            <label htmlFor="price" className="tracking-wide font-semibold text-sm">Property Price*</label>
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
          </div>
          <div className="w-full self-start">
            <label className="tracking-wide font-semibold text-sm">Price Negotiable</label>
            <div onClick={() => setIsOpenToggle((prev) => (!prev))} className={`${isOpenToggle ? 'bg-green-500' : 'bg-secondary'} cursor-pointer w-16 h-8 p-1 rounded-full mt-2`}>
              <span className={`bg-white w-6 ${isOpenToggle ? 'ms-auto' : ''} rounded-full h-full block`}></span>
            </div>
          </div>
        </div>


        <div>

          {/* <Sizing /> */}

          {/* Bedrooms */}
          {/* <div className="mb-4">
            <label className="block font-medium">Bedrooms:</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter number of bedrooms"
            />
          </div> */}

          {/* Bathrooms */}
          {/* <div className="mb-4">
            <label className="block font-medium">Bathrooms:</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter number of bathrooms"
            />
          </div> */}

          {/* Furnished */}
          {/* <div className="mb-4">
            <label className="block font-medium">Furnished:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="furnished"
                  value="Yes"
                  checked={formData.furnished === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="furnished"
                  value="No"
                  checked={formData.furnished === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyType;