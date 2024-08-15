import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/logo2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B4F48] rounded-t-3xl mt-16 pt-20 p-10 font-sans tracking-wide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          <a href="#">
            <img src={logo} alt="logo" />
          </a>
        </div>

        <div className="lg:flex lg:items-center">
          <p className="text-[#E2B04A] max-w-[80%] text-center text-justify">
            La société COGEB IMMOBILIERE, fondée en 1999 et dirigée par Monsieur Mohamed LAZREG, est agréée par le ministère de l’équipement de l’habitat et de l’aménagement du territoire.
          </p>
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <a href="/" className="text-[#E2B04A] hover:text-white text-sm font-bold">ACCUEIL</a>
            </li>
            <li>
              <a href="/about" className="text-[#E2B04A] hover:text-white text-sm font-bold">A PROPOS</a>
            </li>
            <li>
              <a href="/searchProject" className="text-[#E2B04A] hover:text-white text-sm font-bold">NOS PROJETS</a>
            </li>
            <li>
              <a href="/contact" className="text-[#E2B04A] hover:text-white text-sm font-bold">CONTACT</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#E2B04A] text-lg font-semibold mb-6 ">CONTACT</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-[#E2B04A] hover:text-white text-sm font-bold">cogebimmobiliere@gmail.com</a>
            </li>
            <li>
              <a href="#" className="text-[#E2B04A] hover:text-white text-sm font-bold">+216 73 323 435</a>
            </li>
            <li>
              <a href="#" className="text-[#E2B04A] hover:text-white text-sm font-bold">
                Avenue de l'environnement, Sousse, Tunisia, 4000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-300 text-center text-sm mt-10">
        © {currentYear} Copyright. All rights reserved. 
      </p>
      <p className="text-gray-300 text-center text-sm">
        Developed by société SilverLine Solutions
      </p>
    </footer>
  );
};

export default Footer;
