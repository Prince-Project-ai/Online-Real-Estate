import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
let i = 0;
const AuthModalManager = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  

  const handleModalChange = (modalType) => {
    console.log("Hello something is change.");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentModal(modalType);
      setIsAnimating(false);
    }, 800); // Match this with your CSS transition duration
  };

  const handleCloseModal = () => {
    console.log("Hello something is change.");

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentModal(null);
      setIsAnimating(false);
    }, 600);
  };

  console.log(currentModal);
  console.log("from Auth Model : ",i++);
  return (
    <>
      {/* Sign In Button */}
      <button
        onClick={() => setCurrentModal("signin")}
        className="bg-dark rounded tracking-wider text-white px-4 py-2 flex items-center gap-2"
      >
        <i className="ri-user-6-line"></i> Sign In
      </button>

      {/* Modal Container */}
      {currentModal && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Scrollable Container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Modal Content */}
              {/* <div className="relative"> */}
                {currentModal === "signin" && (
                  <SignIn
                    isAnimating={isAnimating}
                    onClose={handleCloseModal}
                    onSwitchToSignUp={() => handleModalChange("signup")}
                  />
                )}

                {currentModal === "signup" && (
                  <SignUp
                    isAnimating={isAnimating}
                    onClose={handleCloseModal}
                    onSwitchToSignIn={() => handleModalChange("signin")}
                  />
                )}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModalManager;