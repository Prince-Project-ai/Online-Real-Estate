import React from "react";
import "remixicon/fonts/remixicon.css";

const HeaderNavigation = ({ step, setStep }) => {
    const steps = [
        { id: 1, name: "Basic Details", icon: "ri-user-line" },
        { id: 2, name: "Location Details", icon: "ri-map-pin-line" },
        { id: 3, name: "Features & Amenities", icon: "ri-settings-3-line" },
        { id: 4, name: "Media Upload", icon: "ri-image-line" },
    ];

    return (
        <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6 relative">
                {steps.map((s, index) => (
                    <div key={s.id} className="relative flex flex-col items-center">
                        {/* Step Indicator */}
                        <div
                            className={`cursor-pointer flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${step >= s.id ? "bg-blue-600 text-white shadow-lg" : "bg-gray-300 text-gray-500"
                                }`}
                            onClick={() => setStep(s.id)}
                        >
                            <i className={`${s.icon} text-xl`}></i>
                        </div>

                        {/* Step Name */}
                        <span
                            className={`mt-2 text-sm font-medium ${step >= s.id ? "text-blue-600" : "text-gray-500"
                                }`}
                        >
                            {s.name}
                        </span>

                        {/* Progress Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-6 left-full w-16 h-1 ${step > s.id ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeaderNavigation;
