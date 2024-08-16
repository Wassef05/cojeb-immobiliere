import React from 'react';
import cov from '../../img/card1.png';

export default function Card2About() {
  return (
    <div>
      <div className="grid place-items-center max-h-full max-w-[100vw] sm:mb-6 mb-28 pb-36 pt-20 sm:pt-8 mx-auto font-[sans-serif]">
        <div className="grid md:grid-cols-2 items-center gap-4 justify-between">
        <div className="md:col-span-1  z-20 mt-24">
            <div className="mb-12 sm:max-w-[50vw]  sm:ml-6 md:ml-8   ">
              <div className=' w-full flex justify-end'>
              <h2 className=" shadow-2xl shadow-black text-black  w-fit text-3xl mb-10 px-10 py-6 bg-gradient-to-r from-slate-300 to-slate-500 rounded-lg font-extrabold">
              OBJECTIF DE LA SOCIETE
              </h2>
                </div>
              <p className='text-justify font-sans  text-xl leading-6'> 
              La société COGEB IMMOBILIERE a pour objectif le développement des activités de la promotion immobilière, à travers une sélection de sites, une conception réfléchie et un produit de qualité. Elle offre à ses clients des espaces d'habitations, de commerce, professionnel ou administratif de haut standing qui répondent à leurs perspectives et qui contribuent à l'amélioration de leur cadre de vie.Notre société est entourée d'une équipe pluridisciplinaire extrêmement Compétente (architectes, bureaux d'études, bureaux de contrôle...), qui a toujours accordé une attention particulière à l'architecture de ses bâtiments dont plusieurs font aujourd'hui figure de référence.COGEB IMMOBILIERE réalise des programmes immobiliers neufs en tenant compte des critères suivants :
              </p>
            </div>
          </div>
          <div className="flex justify-end  flex-row items-center">
  <img
    src={cov}
    className="object-cover mr-24 z-20 ml-10 rounded-l-3xl w-[650px] h-[450px] shadow-2xl shadow-black "
    alt="Profile"
  />
  <div className='-ml-64 bg-gradient-to-r from-slate-300 to-slate-500 w-72 h-[540px] rounded-l-3xl'></div>
</div>
        </div>
      </div>
    </div>
  )
}


