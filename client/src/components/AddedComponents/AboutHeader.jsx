import React, { useEffect, useState } from 'react';
import { HiHome } from "react-icons/hi";
import axios from 'axios';
import cover from "../../img/contact_cover.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Breadcrumb } from "flowbite-react";
import logement from "../../img/logement.png"
import commerce from "../../img/commercial.png"
import parking from "../../img/parking.png"

const fetchPostCount = async () => {
  try {
    const response = await axios.get('/api/posts/count');
    return response.data.count;
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de posts", error);
    return 0;
  }
}

const fetchProjectCount = async () => {
  try {
    const response = await axios.get('/api/projects/count');
    return response.data.count;
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de projets", error);
    return 0;
  }
}

const fetchPostParkingCount = async () => {
  try {
    const response = await axios.get('/api/posts/countParking');
    return response.data.count;
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de parkings posts", error);
    return 0;
  }
}

const fetchProjectParkingCount = async () => {
  try {
    const response = await axios.get('/api/projects/countParking');
    return response.data.count;
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de parkings projets", error);
    return 0;
  }
}

const AboutHeader = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [projectParkingCount, setProjectParkingCount] = useState(0);


  const [displayedProjectCount, setDisplayedProjectCount] = useState(0);
  const [displayedParkingCount, setDisplayedParkingCount] = useState(0);

  const animateValue = (start, end, setter) => {
    let current = start;
    const increment = Math.ceil((end - start) / 100);
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
      current += increment;
      setter(Math.min(current, end));
      if (current >= end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    const getCounts = async () => {
      const projectCount = await fetchProjectCount();
      const projectParkingCount = await fetchProjectParkingCount();

      setProjectCount(projectCount);
      setProjectParkingCount(projectParkingCount);

      animateValue(0, projectCount, setDisplayedProjectCount);
      animateValue(0,  projectParkingCount, setDisplayedParkingCount);
    };
    
    getCounts();

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      <div className="relative h-[80vh] font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-[#0B4F48] before:opacity-50 before:z-10">
        <img
          src={cover}
          alt="contact cover"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="min-h-[350px] relative z-20 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6" data-aos="fade-down">
          <h2 className="sm:text-4xl uppercase text-3xl font-bold mb-6">
            A propos
          </h2>
          <Breadcrumb
            className="text-white"
            aria-label="Default breadcrumb example"
          >
            <Breadcrumb.Item
              href="/"
              icon={() => <HiHome className="text-white text-xl mr-2" />}
              className="text-white"
            >
              <div className="text-white text-xl">Home</div>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-white">
              <div className="text-white text-xl">A propos</div>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="grid items-center justify-center -mt-10 mb-14 mx-auto max-w-[70vw] sm:max-w-[80vw] lg:grid-cols-3 gap-4 z-20 relative lg:left-16 max-lg:px-4">
      <div className="  flex flex-auto items-center justify-center -mt-40 " data-aos="fade-up" data-aos-delay="200">




      </div>
      </div>




      <div className="grid pb-6 -mt-40 mb-14 mx-auto max-w-[50vw] sm:max-w-[60vw] lg:grid-cols-3  z-20 relative  max-lg:px-4 bg-[#0B4F48] rounded-[30px]" data-aos="fade-up" data-aos-delay="200">
        





        <div className="flex lg:w-[18vw] flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-[#0B4F48] " >
        <div className="pt-4 p-0 sm:p-4 md:p-6 grid grid-cols-3 items-center justify-center ">
        <img src={logement} className='col-span-1'/>
        <div className='col-span-2'>
        <h3 className="text-xs text-[#F2DC85] sm:text-base text-center md:text-lg font-semibold uppercase mb-2 ml-4 lg:mt-2">logements</h3><h3 className="text-lg md:text-xl text-[#F2DC85] font-semibold mb-2 mt-6">{displayedProjectCount} <span className='text-[#F2DC85]'>+</span></h3>

        </div>
          </div>
        </div>


        <div className="flex lg:w-[18vw] flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-[#0B4F48] ">
        <div className="p-0 md:p-6 
        grid grid-cols-3 items-center">
        <img src={commerce} className='col-span-1'/>
        <div className='col-span-2'>
        <h3 className="text-xs sm:text-base mt-3 text-center md:text-lg text-[#F2DC85] font-semibold uppercase mb-2">espace commercial</h3>
        <h3 className="text-lg md:text-xl font-semibold mb-2 mt-6 text-[#F2DC85]">{displayedProjectCount} <span className='text-[#F2DC85]'>+</span></h3>
        </div>
          </div>
        </div>


        <div className="flex lg:w-[18vw] flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-[#0B4F48] " >
        <div className="p-0 sm:p-4 md:p-6   items-center grid grid-cols-3">
        <img src={parking} className='col-span-1'/>
              <div className='col-span-2'>
              <h3 className="text-xs sm:text-base mt-3 text-center md:text-lg text-[#F2DC85] font-semibold uppercase mb-2">Parking</h3>
            <h3 className="text-lg md:text-xl font-semibold mb-2 mt-6 text-[#F2DC85]">{displayedParkingCount} <span className='text-[#F2DC85]'>+</span></h3>
         
              </div>
             </div>
        </div>


        </div>
      </div>




  );
}

export default AboutHeader;
