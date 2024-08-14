import React from 'react';
import cov from '../../img/card1.png';

export default function Card1About() {
  return (
    <div>
      <div className="grid place-items-center max-h-full max-w-[100vw] pt-60 sm:pt-40 mx-auto sm:p-28 p-6 font-[sans-serif]">
        <div className="grid md:grid-cols-2 items-center gap-4 justify-between">
          <div className='flex flex-row items-center'>
            <div className='-ml-36 bg-gradient-to-r from-lime-600 to-lime-100 w-72 h-[550px] rounded-r-2xl'></div>
            <img
              src={cov}
              className="-ml-36 w-[650px] h-[450px] rounded-lg shadow-2xl shadow-black"
              alt="Profile"
            />
          </div>
          <div className="md:col-span-1  z-20 mt-14">
            <div className="mb-8 sm:max-w-[50vw]  sm:ml-8 md:ml-20 -mt-20"> 
              <h2 className="shadow-2xl shadow-black text-black  w-fit text-3xl mb-6 px-10 py-6  bg-gradient-to-r from-lime-600 to-lime-100 rounded-lg font-extrabold">
                A PROPOS DE NOUS
              </h2>
              <p className='text-justify font-sans  text-lg leading-8'> 
                La société COGEB IMMOBILIERE, fondée en 1999 et dirigée par Monsieur Mohamed LAZREG, est agréée par le ministère de l’équipement de l’habitat et de l’aménagement du territoire. Son objectif principal est de développer des projets immobiliers de haute qualité en sélectionnant soigneusement les sites, en concevant des espaces répondant aux besoins des clients, et en garantissant un cadre de vie amélioré. Elle dispose d'une équipe compétente, notamment des architectes, bureaux d'études et de contrôle, qui accordent une attention particulière à l'architecture de ses bâtiments, devenus des références dans le domaine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
