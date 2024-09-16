import React from "react";
import iemail from "../../img/maile.png";
import iphone from "../../img/phonee.png";
import ilocation from "../../img/locatione.png";
import iwebsite from "../../img/webe.png";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Centrer le titre au milieu de l'écran */}
      <h1 className="text-[#A95834] pt-10 font-averia font-bold text-5xl text-center mb-8">
        CONTACT
      </h1>

      {/* Grid pour les cartes de contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-center justify-center items-center">

        {/* E-mail */}
        <div className="py-3.5 text-base w-[80vw] sm:w-[45vw] lg:w-[20vw] m-auto h-[130px] bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl shadow-lg shadow-black">
          <img src={iemail} className="w-10 h-8 m-auto mb-1" alt="email icon"/>
          <div className="text-center font-bold">
            <h3 className="text-black">E-mail</h3>
            <p className="text-black">contact@cogebimmobiliere.com</p>
          </div>
        </div>

        {/* Téléphone */}
        <div className="py-3.5 text-base w-[80vw] sm:w-[45vw] lg:w-[20vw] m-auto h-[130px] bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl shadow-lg shadow-black">
          <img src={iphone} className="w-8 h-8 m-auto mb-1" alt="phone icon"/>
          <div className="text-center font-bold">
            <h3 className="text-black">TELEPHONE</h3>
            <p className="text-black">+216 73 323 435</p>
          </div>
        </div>

        {/* Site Web */}
        <div className="py-3.5 text-base w-[80vw] sm:w-[45vw] lg:w-[20vw] m-auto h-[130px] bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl shadow-lg shadow-black">
          <img src={iwebsite} className="w-8 h-8 m-auto mb-1" alt="website icon"/>
          <div className="text-center font-bold">
            <h3 className="text-black">Site Web</h3>
            <p className="text-black">Cogeb-immobiliére.com</p>
          </div>
        </div>

        {/* Adresse */}
        <div className="py-3.5 text-base w-[80vw] sm:w-[45vw] lg:w-[20vw] m-auto h-[130px] bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl shadow-lg shadow-black">
          <img src={ilocation} className="w-8 h-8 m-auto mb-1" alt="location icon"/>
          <div className="text-center font-bold">
            <h3 className="text-black">Adresse</h3>
            <p className="text-black">Avenue de l'environnement, Sousse, Tunisia, 4000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
