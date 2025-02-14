import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const SwipperImageSlider = () => {
    return (
        <>
            <div className="h-full w-full">
                <Swiper
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="h-full w-full"
                >
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                    <SwiperSlide><img src="https://a0.muscache.com/im/pictures/miso/Hosting-785494/original/60180253-4e85-49e2-9d01-e0695f273736.jpeg?im_w=1200&im_format=avif" alt="property-slider-image" className='h-full w-full object-cover' /></SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

export default React.memo(SwipperImageSlider);