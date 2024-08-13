import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import cover1 from "../../img/cover1.JPG"
import cover2 from "../../img/cover2.JPG"
import cover3 from "../../img/cover3.jpg"


const slides = [
  cover1,
  cover2,
  cover3
];

export default function HomeHeader() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,  // Prevents pausing on hover
    pauseOnFocus: false, 

  };

  return (
    <div className='bg-[#E6EEF3]'>
      <div className="h-[90vh] relative z-10 mt-0 bg-[#E6EEF3]">
        <Slider {...settings} className="w-full h-full">
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full">
              <div
                className="w-full h-screen bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${slide})`, backgroundSize: '70%' }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
