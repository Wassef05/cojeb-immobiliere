import React from "react";
import iemail from "../../img/maile.png";
import iphone from "../../img/phonee.png";
import ilocation from "../../img/locatione.png";
import iwebsite from "../../img/webe.png";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-[#A95834] pt-6 font-averia font-bold text-4xl sm:text-5xl text-center mb-6">
        CONTACT
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl text-center justify-center items-center">

        <div className="py-4 text-base w-full max-w-xs sm:max-w-sm m-auto h-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl shadow-lg">
          <img src={iemail} className="w-10 h-8 m-auto mb-2" alt="email icon" />
          <div className="text-center font-bold">
            <h3 className="text-black">E-mail</h3>
            <p className="text-black text-sm sm:text-base">contact@cogeb-immobiliere.com</p>
          </div>
        </div>

        <div className="py-4 text-base w-full max-w-xs sm:max-w-sm m-auto h-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl shadow-lg">
          <img src={iphone} className="w-8 h-8 m-auto mb-2" alt="phone icon" />
          <div className="text-center font-bold">
            <h3 className="text-black">TELEPHONE</h3>
            <p className="text-black text-sm sm:text-base">+216 73 323 435</p>
          </div>
        </div>

        <div className="py-4 text-base w-full max-w-xs sm:max-w-sm m-auto h-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl shadow-lg">
          <img src={iwebsite} className="w-8 h-8 m-auto mb-2" alt="website icon" />
          <div className="text-center font-bold">
            <h3 className="text-black">Site Web</h3>
            <p className="text-black text-sm sm:text-base">Cogeb-immobiliére.com</p>
          </div>
        </div>

        <div className="py-4 text-base w-full max-w-xs sm:max-w-sm m-auto h-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl shadow-lg">
          <img src={ilocation} className="w-8 h-8 m-auto mb-2" alt="location icon" />
          <div className="text-center font-bold">
            <h3 className="text-black">Adresse</h3>
            <p className="text-black text-sm sm:text-base">
              Avenue de l'environnement, Sousse, Tunisia, 4000
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
