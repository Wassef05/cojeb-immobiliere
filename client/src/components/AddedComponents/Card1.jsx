import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import cov from '../../img/card1.png';

export default function Card1() {
  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS and set animation duration
  }, []);

  return (
    <div className="bg-[#E6EEF3]">
      <div 
        className="bg-[#E6EEF3] shadow-lg shadow-gray-500/40  h-auto grid place-items-center max-h-full max-w-[100vw] sm:pt-40 mx-auto sm:p-32 p-6 font-[sans-serif]"
        data-aos="fade-up"
      >
        <div className="grid md:grid-cols-2 items-center gap-6">
          <div 
            className="md:flex md:justify-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              src={cov}
              className="rounded-lg sm:w-2/3 md:w-[300px] lg:w-[500px] shadow-lg shadow-gray-900/70"
              alt="Profile"
              data-aos="fade-right"
              data-aos-delay="400"
            />
          </div>
          <div 
            className="md:col-span-1"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <div className="mb-12 sm:max-w-[50vw]">
             <h2
  className="text-[#A95834]   font-averia font-bold text-5xl mb-16  "
  data-aos="fade-down"
>
  A PROPOS DE NOUS
</h2>

              <p 
                className="  leading-relaxed text-gray-800 leading-loose font-playfair text-base text-justify"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                La société <strong> COGEB IMMOBILIERE</strong>, fondée en <strong>1999</strong> et dirigée par Monsieur <strong> Mohamed LAZREG</strong>, est agréée par le ministère de l’équipement de l’habitat et de l’aménagement du territoire. Son objectif principal est de développer des projets immobiliers de haute qualité en sélectionnant soigneusement les sites, en concevant des espaces répondant aux besoins des clients, et en garantissant un cadre de vie amélioré. Elle dispose d'une équipe compétente, notamment des architectes, bureaux d'études et de contrôle, qui accordent une attention particulière à l'architecture de ses bâtiments, devenus des références dans le domaine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
