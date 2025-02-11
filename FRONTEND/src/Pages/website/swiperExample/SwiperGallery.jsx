import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Navigation, Pagination } from "swiper/modules";
import { FaAngleRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
];


const SwiperGallery = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative flex justify-center">
      {/* Fixed width container */}
      <div className="w-full mx-auto">
        {/* Swiper Component */}
        <Swiper
          effect="flip"
          grabCursor={true}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[EffectFlip, Navigation, Pagination]}
          className="rounded-lg shadow-lg w-full local-host "
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className={`flex w-full justify-center items-center`}>
              <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black transition">
          <FaAngleRight className="rotate-180 text-2xl" />
        </button>
        <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black transition">
          <FaAngleRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SwiperGallery;
