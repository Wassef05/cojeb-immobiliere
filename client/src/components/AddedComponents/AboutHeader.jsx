import React, { useEffect } from "react";
import cover from "../../img/cover1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import StateCard from "./StateCardAbout";

const AboutHeader = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      <div className="relative h-[80vh] font-sans before:absolute before:w-full before:h-full before:inset-0  before:opacity-50 before:z-10">
        <img
          src={cover}
          alt="contact cover"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="min-h-[350px] relative z-20 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-black p-6"
          data-aos="fade-down"
        >
          <h2 className="sm:text-4xl uppercase text-3xl font-bold mb-6">
            A propos
          </h2>
        </div>
      </div>

      {/* Container for the StateCard */}
      <div className="relative z-20 -mt-24 mb-16 flex justify-center items-center">
        {/* Adjust -mt-24 for the vertical placement above the image */}
        <StateCard />
      </div>

      <div className="grid items-center justify-center mb-16 mx-auto max-w-[70vw] sm:max-w-[80vw] lg:grid-cols-3 gap-4 z-20 relative lg:left-16 max-lg:px-4">
        <div
          className="flex flex-auto items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        ></div>
      </div>
    </div>
  );
};

export default AboutHeader;
