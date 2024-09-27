
import  { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import cover from "../../img/LCC.jpg";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import iemail from "../../img/iemailwhite.png"
import ilocation from "../../img/ilocationwhite.png"
import iwebsite from "../../img/iwebsitewhite.png"

export default function ContactHeader() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      <div className="relative h-[80vh] font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-[#0B4F48] before:opacity-20 before:z-10">
        <img
          src={cover}
          alt="contact cover"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="min-h-[350px] relative z-20 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-black p-6" data-aos="fade-down">
        <h2 className="sm:text-5xl text-4xl uppercase font-extrabold mb-6 font-sans">
  Contact
</h2>
          
        </div>
      </div>
      <div className="grid -mt-20 mb-14  mx-auto max-w-[70vw] sm:max-w-[80vw] lg:grid-cols-3 gap-4 z-20 relative lg:left-16 max-lg:px-4">
        <div className="flex lg:w-[18vw] flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-gradient-to-t from-gray-300 via-gray-100 to-gray-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-[#0B4F48] rounded-full p-2">
          <img src={ilocation} className="w-8 h-8 m-auto"/>
          </div>
          <h4 className="text-black text-base font-bold mt-4">Visitez le bureau
          </h4>
          <p className="text-sm text-black-600 mt-2"> Route de l'environnement 4000, Sousse,Tunisia</p>
        </div>
        <div className="flex lg:w-[18vw] flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-gradient-to-t from-gray-300 via-gray-100 to-gray-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-[#0B4F48] rounded-full p-2">
          <img src={iemail} className="w-8 h-8 m-auto"/>
          </div>
          <h4 className="text-gray-800 text-base font-bold mt-4">E-MAIL</h4>
          <p className="text-sm text-gray-600 mt-2">contact@cogeb-immobiliere.com</p>
        </div>
        <div className="flex lg:w-[18vw] flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-gradient-to-t from-gray-300 via-gray-100 to-gray-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-[#0B4F48] rounded-full p-2">
          <img src={iwebsite} className="w-8 h-8 m-auto"/>
          </div>
          <h4 className="text-gray-800 text-base font-bold mt-4">Discutez avec nous</h4>
          <p className="text-sm text-gray-600 mt-2">www.Cogeb-immobiliere.com</p>
        </div>
      </div>
    </div>
  );
}
