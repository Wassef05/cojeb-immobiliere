import { NavLink, Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import logo from '../img/logo.png';
import Hamburger from '../img/hamburgerMenu.svg';
import Close from '../img/close.svg';

export default function NavbarComp() {
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState("bg-transparent");

  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLinkClick = () => {
    setToggle(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);

      if (currentScrollPosition > 0) {
        setNavbarBackground(" bg-white-100/100 backdrop-blur-md"); // Changer de background
      } else {
        setNavbarBackground("bg-transparent"); // Rétablir la transparence
      }

      setIsNavbarVisible(currentScrollPosition < scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navlinkStyles = `
    text-black font-bold text-md sm:text-lg md:text-sm lg:text-xl md:mx-1 lg:mx-8 my-3 
    transform translate-y-2 hover:text-[#006400] 
    hover:border hover:border-solid hover:border-[#FF8C00] hover:rounded-lg hover:p-0
  `;

  return (
    <Navbar
      fluid
      rounded
      className={`fixed top-0 left-0 right-0 rounded-lg justify-between w-full z-50 transition-transform duration-300 ${navbarBackground} ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex flex-wrap rounded-lg md:flex-nowrap pb-6 w-full items-center justify-between">
        <Navbar.Brand href="/">
          <img
            src={logo}
            className={`fixed mr-3 h-20 mt-6 sm:h-36 md:h-40 lg:h-24 ml-6 transition-transform duration-300 ${scrollPosition > 0 ? 'translate-y-0' : 'mt-0'}`}
            alt="nom"
          />
        </Navbar.Brand>

        <div className="flex sm:mr-1 items-center md:order-2">
          {currentUser && (
            <NavLink className={navlinkStyles}>
              <Link to="/profile" className="hover:text-black">
                ADMIN
              </Link>
            </NavLink>
          )}

          <button className="block md:hidden m-4" onClick={handleToggle}>
            <img src={toggle ? Close : Hamburger} alt="menu" className="h-16 w-6 " />
          </button>
        </div>

        <Navbar.Collapse className={`w-full flex-col md:flex-row md:w-auto md:items-center ml-32  ${toggle ? "block bg-white/90 p-6 rounded-3xl text-black pt-4 " : "hidden md:flex"}`}>
          <NavLink className={navlinkStyles} to="/" end onClick={handleLinkClick}>
            ACCUEIL
          </NavLink>

          <NavLink className={navlinkStyles} to="/about" onClick={handleLinkClick}>
            A PROPOS
          </NavLink>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <span
              className={`${navlinkStyles} flex items-center cursor-pointer`}
              onClick={handleDropdownToggle}
            >
              NOS PROJETS
              <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </span>

            {isDropdownOpen && (
              <div className="absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to="/searchProject?filter=terminee"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLinkClick}
                    >
                      Projets Réalisés
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/searchProject?filter=en cours"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLinkClick}
                    >
                      Projet En Cours
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/searchProject?filter=future"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLinkClick}
                    >
                      Futures projets
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <NavLink className={navlinkStyles} to="/contact">
            CONTACT
          </NavLink>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
