import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="bg-gray-100 py-3 px-5 rounded-lg shadow mb-5">
      <ul className="flex space-x-3 text-sm text-gray-600">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === paths.length - 1 ? (
              <span className="font-semibold text-gray-900">{path.name}</span>
            ) : (
              <Link to={path.link} className="hover:text-blue-600">
                {path.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
