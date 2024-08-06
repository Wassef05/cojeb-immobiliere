import React from "react";
import iemail from "../../img/maile.png"
import iphone from "../../img/phonee.png"
import ilocation from "../../img/locatione.png"
import iwebsite from "../../img/webe.png"

export default function Contact() {
  return (
    <div>
      <h1 className="text-[#3A5A40] pt-10 text-3xl font-bold sm:ml-[13%] mb-8">
        CONTACT NOUS{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full text-center justify-center items-center">

        <div class=" py-3.5 text-base w-[50vw] md:w-[35vw] lg:w-[17vw] m-auto mt-6  h-[130px]  bg-[#2D7A71]   rounded-3xl ">
          <img src={iemail} className="w-10 h-8 m-auto mb-1"/>
          <div className="col-span-4 text-center font-bold">
            <h3 className="text-white">E-mail</h3>
            <p className="text-black">cogebimmobiliere@gmail.com</p>
          </div>
        </div>

        <div class=" py-3.5 text-base w-[50vw] md:w-[35vw] lg:w-[17vw] m-auto mt-6   h-[130px] bg-[#2D7A71]   rounded-3xl">
        <img src={iphone} className="w-8 h-8 m-auto mb-1"/>
          <div className="col-span-4 text-center font-bold">
            <h3 className="text-white ">TELEPHONE</h3>
            <p className="text-black ">+216 73 323 435</p>
          </div>
        </div>

        <div class=" py-3.5 text-base w-[50vw] md:w-[35vw] lg:w-[17vw] m-auto mt-6 h-[130px] bg-[#2D7A71]    rounded-3xl justify-center ">
        <img src={iwebsite} className="w-8 h-8 m-auto mb-1"/>
          <div className="col-span-4 text-center font-bold">
            <h3 className="text-white">Site Web</h3>
            <p className="text-black">Cojeb/immobiliére.com</p>
          </div>
        </div>

        <div class=" py-3.5 text-base  w-[50vw] md:w-[35vw] lg:w-[17vw] m-auto mt-6 h-[130px] bg-[#2D7A71]    rounded-3xl">
        <img src={ilocation} className="w-8 h-8 m-auto mb-1"/>
          <div className="col-span-4 text-center font-bold">
            <h3 className="text-white ">Adresse</h3>
            <p className="text-black  ">Avenue de l'environnement, Sousse, 
            Tunisia, 4000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

