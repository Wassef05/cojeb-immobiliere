
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function CoverCard() {
//   const navigate = useNavigate();
//   return (
//     <div className="absolute bottom-60 sm:bottom-16 left-0  w-full  md:mb-0 " style={{ marginBottom: '-120px' ,marginLeft:'-50px' }}>
//       <div className="p-1 w-3/4 md:w-1/2 lg:w-1/3 sm:p-8 md:p-12 mt-8 ml-4 md:ml-12 bg-[#fff]/70 rounded-lg" style={{ borderTopRightRadius: '50px' }}>
//         <h5 className=" mb-4 text-sm md:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-[#515557]" style={{ textShadow: 'gray 2px 9px 13px', lineHeight: '4rem', md: 'lineHeight:4rem' }}>
//           Investissez dans le confort , Investissez <br/> dans l'avenir
//           <button
//             onClick={() => navigate("/searchProject")}
//             className="ml-2 inline-flex items-center px-4 py-2 md:px-8 md:py-2 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-yellow-300 hover:from-yellow-600 hover:to-yellow-800"
//             style={{ borderRadius: '20px' }}
//           >
//             voir plus
//           </button>
//         </h5>
//       </div>
//     </div>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CoverCard.css"; // Import the CSS file for animations

// export default function CoverCard() {
//   const navigate = useNavigate();
//   const [showFirstLine, setShowFirstLine] = useState(true);

//   useEffect(() => {
//     // Toggle between showing the first and second lines every 4 seconds
//     const interval = setInterval(() => {
//       setShowFirstLine((prev) => !prev);
//     }, 4000); // 4 seconds for faster transition

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   }, []);

//   return (
//     <div
//       className="absolute bottom-60 sm:bottom-16 left-0 w-full md:mb-0"
//       style={{ marginBottom: "-10px", marginLeft: "-60px" }}
//       data-aos="fade-right"
//       data-aos-duration="3000"
//     >
//       <div
//         className="p-4 sm:p-6 md:p-8 lg:p-10 mt-8 ml-4 md:ml-16 rounded-lg shadow-lg transition-all duration-500 ease-in-out"
//         style={{
//           width: "60%", // Increased default width to 60%
//           maxWidth: "700px", // Increased max width constraint for larger screens
//           borderTopRightRadius: "50px",
//         }}
//       >
//         <h5
//           className="mb-4 text-sm md:text-4xl lg:text-4xl  uppercase tracking-tight  typing-animation deutshlands-font"
//           style={{
//             lineHeight: "4rem",
//           }}
//         >
//           {showFirstLine ? "Investissez dans le confort," : "Investissez dans l'avenir"}
//         </h5>
//       </div>
//     </div>
//   );
// }





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








