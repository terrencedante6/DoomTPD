import React from "react";

const LandingPageNav = () => {
  return (
    <nav className="w-full p-4 flex justify-between">
      <ul className="flex list-none p-0 gap-4">
        <li>
          <a
            href="#home"
            className="text-white hover:text-gray-400 transition-all duration-500 hover:scale-150"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-white hover:text-gray-400 transition-all duration-500 hover:scale-110"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-white hover:text-gray-400 transition-all duration-500 hover:scale-110"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-white hover:text-gray-400 transition-all duration-500 hover:scale-110"
          >
            Contact
          </a>
        </li>
      </ul>
      <ul className="flex list-none p-0">
        <li>
          <a
            href="#signup"
            className="text-white transition-all duration-500 hover:bg-slate-300/90 hover:text-black py-2 px-4 rounded-md"
          >
            SignUp
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LandingPageNav;
