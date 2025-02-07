import React, { useEffect, useMemo, useState } from "react";

const Sizing = ({ formData, handleChange, formErrors }) => {
  const areaType = useMemo(() => ["Square meter", "Square feet", "hectare"], []);

  const [areaFilterType, setAreaFilterType] = useState(formData.sizeUnit || "Square meter");
  const [areaSize, setAreaSize] = useState(formData.size || 0);
  const [actualSize, setActualSize] = useState(0);

  useEffect(() => {
    let calculatedSize = 0;
    switch (areaFilterType) {
      case "Square meter":
        calculatedSize = areaSize;
        break;
      case "Square feet":
        calculatedSize = (areaSize * 10.76391041671).toFixed(4);
        break;
      case "hectare":
        calculatedSize = (areaSize * 0.0001).toFixed(4);
        break;
      default:
        calculatedSize = 0;
    }

    setActualSize(calculatedSize);

    // Update formData correctly using handleChange
    handleChange({
      target: { name: "size", value: calculatedSize }
    });

    handleChange({
      target: { name: "sizeUnit", value: areaFilterType }
    });
  }, [areaFilterType, areaSize]);

  return (
    <div className="mb-4">
      <label className="block font-medium">Size:</label>
      <div className="w-full flex items-center space-x-3">
        <div className="relative w-full flex items-center">
          <input
            type="number"
            name="size"
            value={areaSize}
            onChange={(e) => setAreaSize(Number(e.target.value))}
            min={0}
            className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 font-description tracking-wide"
            placeholder="Enter size"
          />
        </div>

        <div className="relative w-full flex items-center gap-2">
          <input
            type="number"
            name="actualSize"
            value={actualSize}
            disabled={true}
            className="w-full p-2 border rounded font-description outline-none focus:ring-1 focus:ring-dark duration-200 ease-in-out"
            placeholder="0000"
            readOnly
          />
          <select
            name="sizeUnit"
            value={areaFilterType}
            onChange={(e) => setAreaFilterType(e.target.value)}
            className="p-2 border absolute right-0 rounded font-description outline-none focus:ring-1 focus:ring-dark duration-200 ease-in-out"
          >
            {areaType.map((filter, i) => (
              <option key={i} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-zinc-500 mt-1">Default square meter*</p>
      {
        formErrors.size && <p className="text-red-500 text-xs mt-1">{formErrors.size}</p>
      }
    </div>
  );
};

export default React.memo(Sizing);
