import React from "react";

const LandingPageNav = () => {
  return (
    <nav className="w-full p-4 flex justify-between">
      <style jsx>{`
        .link {
          position: relative;
          display: inline-block;
        }
        .link::after {
          content: "";
          position: absolute;
          bottom: -5px; /* You might want to adjust this value as well to position the thicker line correctly */
          left: 0;
          width: 0;
          height: 6px; /* Increased height for a thicker underline */
          background-color: white;
          transition: width 1.5s ease;
        }
        .link:hover::after {
          width: 100%;
        }
      `}</style>

      <ul className="flex list-none p-0 gap-5 px-3">
        <li>
          <a
            href="#home"
            className="link text-white hover:text-green-600 transition-all duration-500 hover:scale-105 font-bold"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="link text-white hover:text-green-600 transition-all duration-500 hover:scale-105 font-bold"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="link text-white hover:text-green-600 transition-all duration-500 hover:scale-105 font-bold"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="link text-white hover:text-green-600 transition-all duration-500 hover:scale-105 font-bold"
          >
            Contact
          </a>
        </li>
      </ul>
      <ul className="flex list-none p-0">
        <li>
          <a
            href="#signup"
            className="text-white transition-all duration-500 hover:bg-green-800/90 hover:text-white hover:scale-150 py-2 px-4 rounded-md font-bold"
          >
            SignUp
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LandingPageNav;
