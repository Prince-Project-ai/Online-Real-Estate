import React, { useEffect, useMemo, useState } from "react";

const Sizing = () => {

  const areaType = useMemo(() => {
    return ["Square meter", "Square feet", "hectare"]
  }, []);

  const [areaFilterType, setAreaFilterType] = useState("Square meter");

  const [areaSize, setAreaSize] = useState(0);
  const [actualSize, setActualSize] = useState(0);


  useEffect(() => {
    const square_meter = (areaSize).toFixed(4);
    const meter_feet = (areaSize * 10.76391041671).toFixed(4);
    const hectare = (areaSize * 0.0001).toFixed(4);

    switch (areaFilterType) {
      case "Square meter":
        setActualSize(square_meter);
        break;
      case "Square feet":
        setActualSize(meter_feet);
        break;
      case "hectare":
        setActualSize(hectare);
        break;
      default:
        setActualSize(0);
        break;
    }
  }, [areaFilterType, areaSize]);


  // JetBrains Mono NL Light
  return (
    <div className="mb-4">
      <label className="block font-medium">Size:</label>
      <div className="w-full flex items-center space-x-3">
        <div className="relative w-full flex items-center">
          <input
            type="number"
            name="size"
            value={areaSize || 0}
            onChange={(e) => setAreaSize(Number(e.target.value))}
            min={0}
            className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-dark duration-200 ease-in-out"
            placeholder="Enter size"
          />

        </div>
        <div className="relative w-full flex items-center gap-2">
          <input
            type="number"
            name="size"
            value={actualSize}
            disabled={true}
            // onChange={sdsd}
            className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-dark duration-200 ease-in-out"
            placeholder="0000"
            readOnly
          />
          <select
            name="sizeUnit"
            value={areaFilterType}
            onChange={e => setAreaFilterType(e.target.value)}
            className="p-2 border absolute right-0 rounded-lg outline-none focus:ring-1 focus:ring-dark duration-200 ease-in-out"
          >
            {
              areaType.map((filter, i) => (<option key={i} value={filter} defaultValue={filter === areaFilterType}>{filter}</option>))
            }

            {/* <option value="acres">hectare</option> */}
          </select>
        </div>
      </div>
      <p className="text-xs text-zinc-500">Default square meter*</p>
    </div>
  );
};

export default Sizing;
