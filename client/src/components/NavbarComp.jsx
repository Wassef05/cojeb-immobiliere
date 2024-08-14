import { NavLink, Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import logo from '../img/logo.png';
import Hamburger from '../img/hamburgerMenu.svg';
import Close from '../img/close.svg';

export default function NavbarComp() {
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);


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

  const navlinkStyles = "text-black font-bold text-md sm:text-lg md:text-sm lg:text-xl  md:mx-1 lg:mx-8 my-3 hover:text-[#3A5A40] transform translate-y-2";

  return (
    // <Navbar
    //   fluid
    //   rounded
    //   className={`fixed top-0 left-0 right-0 rounded-lg justify-between w-full z-50 bg-transparent transition-transform duration-300 ${
    //     scrollPosition > 0 ? (isNavbarVisible ? 'translate-y-0 bg-white/50 ' : '-translate-y-full ') : 'mt-0'
    //   }`}
    // >

<Navbar
    fluid
    rounded
    className={`fixed top-0 left-0 right-0 rounded-lg justify-between w-full z-50 bg-transparent transition-transform duration-300 ${
      scrollPosition > 0 ? (isNavbarVisible ? 'translate-y-0 bg-white-800/50' : '-translate-y-full') : 'mt-0'
    }`}
    style={{ boxShadow: '0px 4px 10px rgb(0 0 0 / 58%)' }}
  >

      <div className={`flex flex-wrap rounded-lg md:flex-nowrap pb-6 w-full items-center justify-between`}>
        <Navbar.Brand href="/">
          <img src={logo} className={`fixed mr-3 h-20  mt-6 sm:h-36 md:h-40 lg:h-24 ml-6 transition-transform duration-300  ${
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
          <div
            className={navlinkStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="cursor-pointer inline-flex  items-center">
              NOS PROJETS
              <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
            {isHovered && (
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 absolute">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="/searchProject?filter=future" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Nos Projet Non Réalisées
                    </a>
                  </li>
                  <li>
                    <a href="/searchProject?filter=en cours" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Nos Projet En Cours De Réalisation
                    </a>
                  </li>
                  <li>
                    <a href="/searchProject?filter=terminee" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Nos Projet Terminées
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
