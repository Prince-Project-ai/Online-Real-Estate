const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-4">
      {/* Sign In Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center tracking-wide">PropertyFy</h2>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-400">
        <form className="space-y-4">
          {/* Email Input */}
          <div className="mb-2">
            <label htmlFor="email" className="label-style mb-1 font-description">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input-style ps-8 py-2 font-description"
                required
              />
              <i className="ri-mail-line absolute opacity-50 text-dark top-1/2 left-2 transform -translate-y-1/2"></i>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="label-style mb-1 font-description">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input-style ps-8 py-2 font-description"
                required
              />
              <i className="ri-lock-password-fill opacity-50 text-dark absolute top-1/2 left-2 transform -translate-y-1/2"></i>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm font-description text-black hover:underline">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-dark text-white font-medium rounded-md focus:outline-none focus:ring hover:ring focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black"
          >
            Login
            <i className="ri-login-circle-line ps-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;