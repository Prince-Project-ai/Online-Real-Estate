import React, { useState, Suspense, lazy, useCallback, useRef } from "react";
import ResetPassword from "./ResetPassword";

// Lazy-load SignIn and SignUp components
const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));

const AuthModalManager = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [currentModal, setCurrentModal] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoized modal change handler
  const handleModalChange = useCallback((modalType) => {
    setIsAnimating(true);
    setCurrentModal(modalType);
    setIsAnimating(false);
  }, []);

  // Memoized modal close handler
  const handleCloseModal = useCallback(() => {
    setIsAnimating(true);
    setCurrentModal(null);
    setIsAnimating(false);
  }, []);

  // console.log("Component Render. => ", renderCount);

  return (
    <>
      {/* Sign In Button */}
      <button
        onClick={() => handleModalChange("signin")}
        className="bg-dark rounded text-xs px-2 py-1 tracking-wider text-white lg:px-4 lg:py-2 flex items-center gap-1 lg:gap-2"
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
              {currentModal === "signin" && (
                <Suspense fallback={<p>Loading Sign In...</p>}>
                  <SignIn
                    isAnimating={isAnimating}
                    onClose={handleCloseModal}
                    onSwitchToSignUp={() => handleModalChange("signup")}
                    onSwitchToResetPassword={() => handleModalChange("resetPassword")}
                  />
                </Suspense>
              )}

              {currentModal === "signup" && (
                <Suspense fallback={<p>Loading Sign Up...</p>}>
                  <SignUp
                    isAnimating={isAnimating}
                    onClose={handleCloseModal}
                    onSwitchToSignIn={() => handleModalChange("signin")}
                  />
                </Suspense>
              )}

              {currentModal === "resetPassword" && (
                <Suspense fallback={<p>Loading Reset Password...</p>}>
                  <ResetPassword
                    isAnimating={isAnimating}
                    onClose={handleCloseModal}
                  // onSwitchToS={() => handleModalChange("signin")}
                  />
                </Suspense>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(AuthModalManager);