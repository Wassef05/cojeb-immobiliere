import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logement from "../../img/logement.png"
import commerce from "../../img/commercial.png"
import parking from "../../img/parking.png"




const fetchProjectCount = async () => {
  try {
    const response = await axios.get('/api/projects/count');
    return response.data.count;
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de projets", error);
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

export default function StateCard() {
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
  }, []);

  return (
    <div className='mt-12 flex text-center justify-center '>
      <div className="text-white pb-10 m-2   font-[sans-serif] ">
        <div className="max-w-5xl  px-0 ">
        <div className="px-10 sm:flex sm:flex-col lg:flex-row lg:grid-cols-3 bg-[#515557] rounded-[30px] h-38  gap-3 max-md:max-w-md mx-auto border-black border-1 items-center ">
        <div className="rounded-lg overflow-hidden  ">      
              <div className="pt-4 p-0 sm:p-1 md:p-2  grid grid-cols-3">
              <img src={logement} className='p-2 col-span-1'/>
              <div className=' col-span-2'>
              <h3 className="text-xs sm:text-base  md:text-lg font-semibold uppercase mb-2 ml-4 lg:mt-2 text-[#F2DC85]">logements</h3>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#F2DC85]">{displayedProjectCount}<span className='text-[#F2DC85]'>+</span></h3>
              </div>
                
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <div className="pt-4 p-0 sm:p-1 md:p-2   grid grid-cols-3">
              <img src={commerce} className='p-2 col-span-1'/>
              <div className='flex flex-col col-span-2'>
              <h3 className="text-xs sm:text-base mt-3 text-center md:text-lg font-semibold uppercase mb-2 text-[#F2DC85]">espace commercial</h3>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#F2DC85]">{displayedProjectCount} <span className='text-[#F2DC85]'>+</span></h3>
              </div>
                
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <div className="pt-4 p-0 sm:p-1 md:p-2  grid grid-cols-3">
              <img src={parking} className='p-2 col-span-1'/>
              <div className='flex flex-col col-span-2'>
              <h3 className="text-xs sm:text-base mt-3 text-center md:text-lg font-semibold uppercase mb-2 text-[#F2DC85]">place parking</h3>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#F2DC85]">{displayedParkingCount} <span className='text-[#F2DC85]'>+</span></h3>
              </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
