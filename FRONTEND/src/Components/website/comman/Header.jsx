import React from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import AccessMenu from "../Header/AccessMenu";
import AuthModelManager from "../Auth/AuthModelManager";

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="border-b h-auto border-dark px-5">
      <nav className="max-w-7xl md:px-4 lg:px-0 container mx-auto flex items-center justify-between py-2 relative">
        {/* Logo Section */}
        <Logo />
        <AuthSection isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

// eslint-disable-next-line react/display-name
const Logo = React.memo(() => (
  <div className="logo">
    <h2 className="text-2xl font-bold">PropertyFy</h2>
  </div>
));

// eslint-disable-next-line react/display-name, react/prop-types
const AuthSection = React.memo(({ isAuthenticated }) => (
  <div className="menu lg:flex items-center">
    <div className="auth flex items-center">
      {
        isAuthenticated ? <AccessMenu /> : <AuthModelManager />
      }
    </div>
  </div>
));

export default React.memo(Header);
