// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from "../img/logo2.png";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-r from-gray-400 to-gray-400 rounded-t-3xl mt-16 pt-20 p-10 font-sans tracking-wide">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         <div className="lg:flex lg:items-center">
//           <a href="#">
//             <img src={logo} alt="logo" />
//           </a>
//         </div>

//         {/* <div className="lg:flex lg:items-center">
//           <p className="text-black max-w-[80%] text-center text-justify">
//             La société COGEB IMMOBILIERE, fondée en 1999 et dirigée par Monsieur Mohamed LAZREG, est agréée par le ministère de l’équipement de l’habitat et de l’aménagement du territoire.
//           </p>
//         </div> */}

//         <div>
//           <ul className="space-y-4">
//             <li>
//               <a href="/" className="text-black hover:text-black text-sm font-bold">ACCUEIL</a>
//             </li>
//             <li>
//               <a href="/about" className="text-black hover:text-black text-sm font-bold">A PROPOS</a>
//             </li>
//             <li>
//               <a href="/searchProject" className="text-black hover:text-black text-sm font-bold">NOS PROJETS</a>
//             </li>
//             <li>
//               <a href="/contact" className="text-black hover:text-black text-sm font-bold">CONTACT</a>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-black text-lg font-semibold mb-6 ">CONTACT</h4>
//           <ul className="space-y-4">
//             <li>
//               <a href="#" className="text-black hover:text-black text-sm font-bold">cogebimmobiliere@gmail.com</a>
//             </li>
//             <li>
//               <a href="#" className="text-black hover:text-black text-sm font-bold">+216 73 323 435</a>
//             </li>
//             <li>
//               <a href="#" className="text-black hover:text-black text-sm font-bold">
//                 Avenue de l'environnement, Sousse, Tunisia, 4000
//               </a>
//             </li>
//           </ul>
//         </div>

//           <div>


// icone

//           </div>
//       </div>

//       <p className="text-gray-300 text-center text-sm mt-10">
//         © {currentYear} Copyright. All rights reserved. 
//       </p>
//       <p className="text-gray-300 text-center text-sm">
//         Developed by société SilverLine Solutions
//       </p>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/logo2.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="bg-gradient-to-r from-slate-300 to-slate-500 rounded-t-3xl mt-16 pt-20 p-10 font-sans tracking-wide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center flex-col">
          <a href="#">
            <img src={logo} alt="logo" />
          </a>
          <p className="mt-4 text-black text-center">
            Notre vision est de fournir des outils fiables pour des créations sans limites.
          </p>
        </div>

        <div>
          <h1 className="text-black text-lg font-semibold mb-6">Liens</h1>
          <ul className="space-y-4">
            <li>
              <a href="/" className="text-black hover:text-black text-sm font-bold">ACCUEIL</a>
            </li>
            <li>
              <a href="/about" className="text-black hover:text-black text-sm font-bold">A PROPOS</a>
            </li>
            <li>
              <a href="/searchProject" className="text-black hover:text-black text-sm font-bold">NOS PROJETS</a>
            </li>
            <li>
              <a href="/contact" className="text-black hover:text-black text-sm font-bold">CONTACT</a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-black text-lg font-semibold mb-6">CONTACT</h1>
          <ul className="space-y-4">
            <li>
              <a href="mailto:cogebimmobiliere@gmail.com" className="text-black hover:text-black text-sm font-bold">cogebimmobiliere@gmail.com</a>
            </li>
            <li>
              <a href="tel:+21673323435" className="text-black hover:text-black text-sm font-bold">+216 73 323 435</a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-black text-sm font-bold">
                Avenue de l'environnement, Sousse, Tunisia, 4000
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-black text-lg font-semibold mb-6">SUIVEZ-NOUS</h4>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
           
            <a href="mailto:cogebimmobiliere@gmail.com" className="text-black hover:text-black text-2xl">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <p className="mt-4 text-sm text-black text-center">
            Restez connectés avec nous pour des mises à jour et des offres exclusives.
          </p>
          <div className="flex space-x-6">
          <a href="https://wa.me/21673323435" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black text-2xl">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="tel:+21673323435" className="text-black hover:text-black text-2xl">
              <i className="fas fa-phone"></i>
            </a>
            </div>

        </div>
      </div>

      <p className="text-gray-300 text-center text-sm mt-10">
        © Copyright {currentYear} by cogeb-immobiliere . All rights reserved.
      </p>
      {/* <p className="text-gray-300 text-center text-sm">
        Developed by société SilverLine Solutions
      </p> */}
    </footer>
  );
};

export default Footer;
