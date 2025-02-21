import React, { useEffect, useState } from "react";
import { useSocket } from "../../../../Contexts/SocketContext";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const ApprovalProperty = () => {
  const { socket } = useSocket();
  const { currentAuth } = useAuth();
  const [properties, setProperties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (!socket) return;

    const handleSendProperty = (data) => {
      setProperties(data);
    };

    socket.emit("retrivedNotApprovalProperty", currentAuth._id);
    socket.on("Properties", handleSendProperty);

    socket.on("error", (message) => {
      console.error("WebSocket error:", message);
    });

    return () => {
      socket.off("Properties", handleSendProperty);
    };
  }, [socket, currentAuth._id]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Approval Listings</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Image</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Property Title</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Status</th>
                {/* <th className="py-3 px-4 font-normal text-dark/70 text-xs">Action</th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {properties.map((property, i) => {
                const propertyImages = property?.images?.map((img) => img?.propertyImages) || [];
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      {propertyImages.length > 0 && (
                        <img
                          src={propertyImages[0]}
                          className="w-16 h-16 object-contain rounded-lg cursor-pointer"
                          alt="property"
                          onClick={() => {
                            setImages(propertyImages);
                            setPhotoIndex(0);
                            setIsOpen(true);
                          }}
                        />
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{property.propertyTitle}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {property.isApproved ? (
                        <span className="border border-green-500 text-white px-2 py-1 rounded">Approved</span>
                      ) : (
                        <span className="border border-yellow-500 text-yellow-500 font-description px-2 py-1 rounded">Pending</span>
                      )}
                    </td>
                    {/* <td className="py-3 px-4 flex space-x-2">
                        <button
                          onClick={() => handleApprove(property._id)}
                          className="bg-green-500 text-white rounded text-xl px-2"
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          onClick={() => handlePending(property._id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                        >
                          <RiDeleteBin5Line className="text-xl" />
                        </button>
                        <button
                          className="p-2 bg-blue-700 text-white rounded"
                          onClick={() => alert(`View ${property.propertyTitle}`)}
                        >
                          <FaRegEye className="text-xl" />
                        </button>
                      </td> */}
                  </tr>
                );
              })}
              {!properties.length && (
                <tr>
                  <td className="py-6 text-center text-gray-500" colSpan={4}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close gallery"
            >
              ✖
            </button>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="w-80 h-96"
              initialSlide={photoIndex}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`property ${index}`}
                    className="w-full h-full object-contain rounded-lg bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ApprovalProperty);