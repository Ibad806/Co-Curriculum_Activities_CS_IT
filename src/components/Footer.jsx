// Footer.jsx
import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = (props) => {
  return (
    <footer className={`${props.footercolor} ${props.footertext} py-5 px-8`}>
      {/* Top Section */}
      <div className="text-left mb-10 border-t border-gray-700">
        <h1 className="md:text-[50px] text-[25px] font-bold mt-[50px]">
          Sir Syed University
        </h1>
        <p className=" md:mt-10 mt-7 md:text-[18px] text-[3vw] leading-[5vw]">
          High level experience in web design and development knowledge,
          producing quality work.
        </p>
      </div>

      {/* Links and Information */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="py-[15px] md:text-[15px] text-[4vw]">Home</li>
            <li className="md:text-[15px] text-[4vw]">All Events</li>
            <li className="pt-[15px] md:text-[15px] text-[4vw]">Gallery</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul>
            <li className="py-[15px] md:text-[15px] text-[4vw]">FAQs</li>
            <li className="md:text-[15px] text-[4vw]">Terms & Conditions</li>
            <li className="pt-[15px] md:text-[15px] text-[4vw]">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul>
            <li className="py-[15px] md:text-[15px] text-[4vw]">0340-2862497</li>
            <li className="md:text-[15px] text-[4vw]">ibadbilal029@gmail.com</li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <ul>
            <li className="py-[15px] md:text-[15px] text-[4vw]">483920, Karachi</li>
            <li className="md:text-[15px] text-[4vw]">Myasnitskaya 22/2/5, Office 4</li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-10 mt-10">
        <a href="#" className="hover:text-blue-500">
          <FaTwitter />
        </a>
        <a href="#" className="hover:text-blue-600">
          <FaFacebookF />
        </a>
        <a href="#" className=" hover:text-pink-500">
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-gray-500">
          <FaGithub />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        © Copyright 2024, All Rights Reserved by IBAD
      </div>
    </footer>
  );
};

export default Footer;
