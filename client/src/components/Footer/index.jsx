import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="w-full">
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:py-8">
          <p className="text-center text-sm text-gray-700 sm:text-left">
            Copyright {new Date().getFullYear()} RST Store. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
