import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import cov from '../../img/card1.png';

export default function Card2() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-slate-100 to-slate-400 sm:mt-10 mt-2 h-auto grid place-items-center max-h-full max-w-[100vw] mx-auto sm:p-16 p-4 font-[sans-serif]">
        <div className="grid md:grid-cols-2 items-center gap-4 ">
          {/* Section Texte */}
          <div className="md:col-span-1">
            <div className="mb-12 sm:max-w-[50vw] max-w-full" data-aos="fade-right">
              <h2 className="shadow-2xl shadow-black text-black text-2xl sm:text-3xl mb-6 sm:mb-10 px-6 sm:px-10 py-4 sm:py-6 bg-gradient-to-r from-slate-200 to-slate-600 rounded-lg font-extrabold">
                OBJECTIF DE LA SOCIETE
              </h2>
              <p className="text-black font-playfair text-sm sm:text-base text-justify leading-6 sm:leading-7">
                La société <strong> COGEB IMMOBILIERE </strong> a pour objectif le développement des activités de la promotion immobilière, à travers une sélection de sites, une conception réfléchie et un produit de qualité. Elle offre à ses clients des espaces d'habitations, de commerce, professionnel ou administratif de haut standing qui répondent à leurs perspectives et qui contribuent à l'amélioration de leur cadre de vie. Notre société est entourée d'une équipe pluridisciplinaire extrêmement compétente (architectes, bureaux d'études, bureaux de contrôle...), qui a toujours accordé une attention particulière à l'architecture de ses bâtiments dont plusieurs font aujourd'hui figure de référence. COGEB IMMOBILIERE réalise des programmes immobiliers neufs en tenant compte des critères suivants :
              </p>
            </div>
          </div>
          
          {/* Section Image */}
          <div data-aos="fade-left" className="flex justify-center md:justify-end">
            <img
              src={cov}
              className="lg:h-[400px] h-[250px] sm:h-[300px] rounded-3xl shadow-[15px_-15px_0px_rgba(145,146,159,0.55)]"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
