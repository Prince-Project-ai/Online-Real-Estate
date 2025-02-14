import React from "react";
import SwipperImageSlider from "./swiperExample/SwipperImageSlider";
import { FaMapLocationDot } from "react-icons/fa6";


const PropertyDetails = () => {
  return (
    <section className="max-w-7xl mx-auto my-10">
      <div className="property-images">
        <div className="grid-images grid gap-5 grid-cols-12">
          <div className="col-span-8">
            <div className="rounded-[16px] border border-dark self-start overflow-hidden">
              <div className="w-full h-[450px]">
                <SwipperImageSlider className="h-full" />
              </div>
              <div className="">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="propertyTitle">
                      <h3 className="font-bold text-dark font-description tracking-wide text-4xl">Elegant studio flat</h3>
                    </div>
                    <div className="propertyPrice">
                      <h3 className="font-bold text-dark tracking-wide text-4xl font-description">$250,000</h3>
                    </div>
                  </div>
                  <hr className="bg-secondary py-[0.50px] my-5" />
                  <div className="address mb-5 flex space-x-3 items-center">
                    <FaMapLocationDot className="text-gray-500" />
                    <p className="text-gray-500">102 Ingraham St, Brooklyn, NY 11237</p>
                  </div>
                  <button className="bg-dark text-white text-sm py-3 px-5 rounded-lg">
                    Ask a Question
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-[16px] mt-5 border border-dark self-start overflow-hidden">
              <h2 className="font-semibold text-2xl">Get Direction</h2>
            </div>
          </div>

          <div className="col-span-4">

            <div className="contact-seller border rounded-[16px] border-dark p-6 pt-7 self-start">
              <h3 className="text-2xl font-semibold mb-4 font-inter">Contact Sellers</h3>
              <div className="profile-info flex items-center gap-4">
                <div className="pro-img w-24 rounded-full overflow-hidden h-24">
                  <img src="https://themesflat.co/html/proty/images/avatar/seller.jpg" className="w-full h-full object-cover" alt="profile-images" />
                </div>
                <div className="pro-info">
                  <h2 className="font-semibold mb-1">Shara Conner</h2>
                  <div className="seller-info">
                    <p className="text-xs font-medium">1-333-345-6868</p>
                    <p className="text-xs font-medium">hemesflat@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="contact-info space-y-5 mt-8">
                <input type="text" name="fullName" placeholder="Enter Name" className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 tracking-wide" />
                <textarea name="" rows={3} placeholder="How can a seller help" className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 tracking-wide" id=""></textarea>
                <button className="w-full py-3 tracking-wide text-white bg-dark rounded-lg">Send Message</button>
              </div>
            </div>


            <div className="contact-seller border rounded-[16px] border-dark p-6 pt-7 self-start mt-5">
              {/* <div className="profile-info flex items-center gap-4">
                                <div className="pro-img w-24 rounded-full overflow-hidden h-24">
                                    <img src="https://themesflat.co/html/proty/images/avatar/seller.jpg" className="w-full h-full object-cover" alt="profile-images" />
                                </div>
                                <div className="pro-info">
                                    <h2 className="font-semibold mb-2">Shara Conner</h2>
                                    <div className="seller-info">
                                        <p className="text-xs font-medium">1-333-345-6868</p>
                                        <p className="text-xs font-medium">hemesflat@gmail.com</p>
                                    </div>
                                </div>
                            </div> */}

              <h3 className="text-2xl font-semibold mb-4 font-inter">Contact me</h3>
              <div className="contact-info space-y-5">
                <input type="text" name="fullName" placeholder="Your Name" className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 tracking-wide" />
                <input type="email" name="email" placeholder="email" className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 tracking-wide" />
                <textarea name="" rows={3} placeholder="Message" className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 tracking-wide" id=""></textarea>
                <button className="w-full py-3 tracking-wide text-white bg-dark rounded-lg">Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(PropertyDetails);
