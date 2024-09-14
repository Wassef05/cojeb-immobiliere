import React from 'react';
import cov from '../../img/card1.png';

export default function Card2About() {
  return (
    <div>
      <div className="grid place-items-center max-h-full max-w-[100vw] sm:mb-6 mb-28 pb-36 pt-20 sm:pt-8 mx-auto font-[sans-serif]">
        <div className="grid md:grid-cols-2 items-center gap-4 justify-between">
          
          {/* Section Texte */}
          <div className="md:col-span-1 z-20 mt-12 sm:mt-24">
            <div className="mb-12 mx-4 sm:max-w-[90vw] md:max-w-[50vw] sm:mx-6 md:ml-8">
              
              {/* Titre centré sur mobile */}
              <div className='w-full flex justify-center md:justify-end'>
                <h2 className="shadow-2xl shadow-black text-black text-center md:text-right w-fit text-2xl sm:text-3xl mb-6 sm:mb-10 px-6 sm:px-10 py-4 sm:py-6 bg-gradient-to-r from-slate-300 to-slate-500 rounded-lg font-extrabold">
                  OBJECTIF DE LA SOCIETE
                </h2>
              </div>

              {/* Texte centré avec marges pour mobile */}
              <p className="text-black font-playfair text-sm sm:text-base text-justify text-xl leading-6 mx-4 sm:mx-8 md:mx-0">
                La société <strong>COGEB IMMOBILIERE</strong> a pour objectif le développement des activités de la promotion immobilière, à travers une sélection de sites, une conception réfléchie et un produit de qualité. Elle offre à ses clients des espaces d'habitations, de commerce, professionnel ou administratif de haut standing qui répondent à leurs perspectives et qui contribuent à l'amélioration de leur cadre de vie. Notre société est entourée d'une équipe pluridisciplinaire extrêmement compétente (architectes, bureaux d'études, bureaux de contrôle...), qui a toujours accordé une attention particulière à l'architecture de ses bâtiments dont plusieurs font aujourd'hui figure de référence. COGEB IMMOBILIERE réalise des programmes immobiliers neufs en tenant compte des critères suivants :
              </p>
            </div>
          </div>

          {/* Section Image */}
          <div className="relative flex justify-center md:justify-end items-center">
            <img
              src={cov}
              className="object-cover z-20 w-[250px] h-[180px] sm:w-[350px] sm:h-[250px] md:w-[650px] md:h-[450px] rounded-l-3xl shadow-2xl shadow-black"
              alt="Profile"
            />
            <div className="absolute -ml-12 sm:-ml-16 md:-ml-64 bg-gradient-to-r from-slate-300 to-slate-500 w-[100px] h-[200px] sm:w-40 sm:h-[350px] md:w-72 md:h-[540px] rounded-l-3xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
