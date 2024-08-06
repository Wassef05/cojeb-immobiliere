import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Slider from "react-slick";

export default function Carousel() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partners");
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundColor: "rgb(173, 170, 170)",
          borderRadius: "40px",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="w-5/6 m-auto shadow-2xl rounded-3xl ">
      <Slider {...settings} className="m-12">
        {partners.map((partner, index) => (
          <div key={index} className="py-10 bg-transparent">
            <Card className="max-w-sm  mx-auto  bg-transparent ">
              <img src={partner.imgUrl[0]} alt={`Partner logo for ${partner._id}`} className=" max-h-[250px] min-h-[200px] w-full object-contain rounded-lg hover:scale-105 duration-300" />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
