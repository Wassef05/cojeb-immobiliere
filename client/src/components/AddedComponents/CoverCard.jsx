import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CoverCard.css";
import { useTypewriter } from "react-simple-typewriter";

export default function CoverCard() {
  const navigate = useNavigate();

  const [text, count] = useTypewriter({
    words: ["Investissez intelligemment\n avec Cogeb Immobilière"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 3000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const sponsorsElement = document.getElementById("sponsor");
      if (sponsorsElement) {
        sponsorsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute bottom-60 sm:bottom-16 left-0  w-full  md:mb-0 " style={{ marginBottom: '-120px' ,marginLeft:'-50px' }}>
 <div
      className="p-1 w-3/4 md:w-1/2 sm:p-8 md:p-12 mt-8 ml-4 md:ml-12 bg-[#fff]/40 rounded-lg"
      style={{ borderTopRightRadius: '50px', width: '35%' }} // Set the width manually
    >      <div className="textDiv text-center">
        <h1 className="deutschlands-font text-bright">
          <span className="baraka">
            {text.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
            {/* <span className="cursor" style={{ color: 'orange' }}>|</span> */}
          </span>
        </h1>
      </div>
    </div>
    </div>
  );
}








