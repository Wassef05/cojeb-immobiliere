import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import ProjectListingCard from "../components/ProjectListingCard";
import SkletonLoading from "./SkletonLoading";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProjetFuture() {
    const [loading, setLoading] = useState(true);
    const [projectslistings, setprojectslistings] = useState([]);
    const navigate = useNavigate();
  
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
  
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
  
    useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/projects/search?etat=future`);
          const json = await res.json();
          if (json.success === false) {
            setLoading(false);
          } else {
            setprojectslistings(json);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }, []);
    const itemCount = 3;
  
    const settings = {
      dots: true,
      infinite: itemCount>4,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SampleNextArrow />,
      autoplay: true,
      autoplaySpeed: 2000,
      appendDots: (dots) => (
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {dots.slice(0, 4)}
          {/* {dots.length > 5 && <li className="justify:center  "></li>} */}
        </ul>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
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
  
    return (
      <section>
        <div
          className="mx-auto space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8"
          data-aos="fade-up"
        >
          <div className="content">
            <h2
              className="text-3xl  sm:text-3xl font-bold  text-[#515557] sm:text-left "
              data-aos="fade-down"
            >
              NOS FUTURS PROJETS
            </h2>
          </div>
  
          <div className="post_container !mt-4">
            {loading ? (
              <SkletonLoading />
            ) : (
              <div className="slider_container">
                <Slider {...settings} className="z-10 relative gap-3">
                  {projectslistings &&
                    projectslistings.map((project, index) => (
                      <div key={project._id} data-aos="fade-up" data-aos-delay={index * 100}>
                        <ProjectListingCard project={project} />
                      </div>
                    ))}
                </Slider>
                <div className="text-center pt-6" data-aos="fade-up" data-aos-delay="200">
                  <button
                    onClick={() => navigate("/searchProject?filter=future")}
                    className="uppercase items-center px-4 py-3 text-lg font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                    style={{
                      background:
                        "linear-gradient(270deg, #B88824 0%, #E1C550 39%, #CEA93B 74%, #B07A12 100%)",
                    }}
                  >
                    voir plus
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
  

