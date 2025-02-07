import React from "react";

const PricingCard = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">


      <div className="p-5 bg-secondary rounded-2xl border-dark border-2">
        {/* <input type="radio" name="pricing" id="free" className="font-description hidden" /> */}
        <h6 className="text-3xl font-description mb-2">Easy Start</h6>
        <h3 className="font-description text-zinc-500 mb-2"><span className="text-5xl font-semibold text-dark">$00</span> /month</h3>
        <p className="mb-3">Ideal if you're testing the waters and want to start with basic exposure.</p>

        <ul className="mt-10 space-y-3">
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>7-Day Run for your ad active for one weeks</li>
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>Keep your ad live and active for one week</li>
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>Track views and basic engagement metrics</li>
        </ul>
        <button className="border w-full py-3 tracking-wide bg-black text-white rounded-lg mt-4">Select Easy Start for free</button>
      </div>


      <div className="p-5 bg-secondary rounded-2xl border-dark border-2">
        {/* <input type="radio" name="pricing" id="free" className="font-description hidden" /> */}
        <h6 className="text-3xl font-description mb-2">Fast Sale</h6>
        <h3 className="font-description text-zinc-500 mb-2"><span className="text-5xl font-semibold text-dark">$25</span> /month</h3>
        <p className="mb-3">Ideal if you're testing the waters and want to start with basic exposure.</p>

        <ul className="mt-10 space-y-3">
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>7-Day Run for your ad active for one weeks</li>
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>Keep your ad live and active for one week</li>
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>Track views and basic engagement metrics</li>
        </ul>
        <button className="border w-full py-3 tracking-wide bg-black text-white rounded-lg mt-4">Select Fast Sale</button>
      </div>



      <div className="p-5 bg-secondary rounded-2xl border-dark border-2">
        {/* <input type="radio" name="pricing" id="free" className="font-description hidden" /> */}
        <h6 className="text-3xl font-description mb-2">Turbo Boost</h6>
        <h3 className="font-description text-zinc-500 mb-2"><span className="text-5xl font-semibold text-dark">$70</span> /month</h3>
        <p className="mb-3">Ideal if you're testing the waters and want to start with basic exposure.</p>

        <ul className="mt-10 space-y-3">
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>7-Day Run for your ad active for one weeks</li>
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>Keep your ad live and active for one week</li>
          <li><span><i className="ri-check-fill me-2 text-xl"></i></span>Track views and basic engagement metrics</li>
        </ul>
        <button className="border w-full py-3 tracking-wide bg-black text-white rounded-lg mt-4">Select Turbo Boots</button>
      </div>
    </div>
  );
};

export default React.memo(PricingCard);

