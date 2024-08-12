import { NavLink, Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import logo from '../img/logo1.png';
import Hamburger from '../img/hamburgerMenu.svg';
import Close from '../img/close.svg';

export default function NavbarComp() {
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition) {
        // User is scrolling down
        setIsNavbarVisible(false);
      } else {
        // User is scrolling up
        setIsNavbarVisible(true);
      }
      setLastScrollPosition(currentScrollPosition);
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const navlinkStyles = "text-white font-bold text-md sm:text-lg md:text-sm lg:text-lg  md:mx-1 lg:mx-4 my-3 hover:text-[#3A5A40] transform translate-y-2";

  return (
    <Navbar
      fluid
      rounded
      className={`fixed top-0 left-0 right-0 rounded-lg justify-between w-full z-50 bg-[#6F6A6A]/70 transition-transform duration-300 ${
        scrollPosition > 0 ? (isNavbarVisible ? 'translate-y-0' : '-translate-y-full') : 'mt-8'
      }`}
    >
      <div className={`flex flex-wrap rounded-lg md:flex-nowrap pb-6 w-full items-center justify-between`}>
        {/* <Navbar.Brand href="/">
          <img
            src={logo}
            className={`fixed mr-3 sm:h-36 lg:h-48 ml-20 transition-transform duration-300 ${
              scrollPosition > 0 ? (isNavbarVisible ? 'translate-y-0' : '-translate-y-full') : 'mt-0'
            }`}
            alt="nom"
          />
        </Navbar.Brand> */}
        <Navbar.Brand href="/">
          <img src={logo} className={`fixed mr-3 h-36  mt-12 sm:h-36 md:h-40 lg:h-44 ml-6 transition-transform duration-300  ${
        scrollPosition > 0 ? (isNavbarVisible ? 'translate-y-0' : '-translate-y-full') : 'mt-0'
      }`} alt="nom" />
        </Navbar.Brand>
        <div className="flex sm:mr-1 items-center md:order-2">
          {currentUser && (
            <NavLink className={navlinkStyles}>
              <Link to='/profile' className=" hover:text-black">ADMIN</Link>
            </NavLink>
          )}
          <button
            className="block md:hidden m-4"
            onClick={handleToggle}
          >
            <img src={toggle ? Close : Hamburger} alt="menu" className="h-6 w-6" />
          </button>
        </div>
        <Navbar.Collapse className={`w-full ml-32 flex-col md:flex-row md:w-auto md:items-center ${toggle ? "block bg-gray-600/50 text-black pt-12 " : "hidden md:flex"}`}>
          <NavLink
            className={navlinkStyles}
            to="/"
            end
          >
            ACCUEIL
          </NavLink>
          <NavLink
            className={navlinkStyles}
            to="/about"
          >
            A PROPOS
          </NavLink>
          <NavLink
            className={navlinkStyles}
            to="/searchProject?filter=terminee"
          >
            NOS PROJETS REALISES
          </NavLink>
          <NavLink
            className={navlinkStyles}
            to="/searchProject?filter=en cours"
          >
            NOS PROJETS EN COURS
          </NavLink>
          <NavLink
            className={navlinkStyles}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
