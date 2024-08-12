// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function CoverCard() {
//   const navigate = useNavigate();
//   return (
//     <div className="absolute bottom-6 left-0 w-full p-8" style={{ marginBottom: '-130px' }}>
//       <div className="w-1/3 p-12 mt-8 ml-12 bg-[#fff]/70 rounded-lg" style={{ borderTopRightRadius: '50px' }}>
//         <h5 className="mb-4 text-5xl font-extrabold uppercase tracking-tight text-[#515557]" style={{ textShadow: 'gray 2px 9px 13px', lineHeight: '4rem' }}>
//           Investissez dans le confort , <br /> Investissez <br /> dans
//           <span style={{ display: 'inline-block', marginRight: '1rem' }}>l'avenir</span>
//           <button
//             onClick={() => navigate("/searchProject")}
//             className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-yellow-300 hover:from-yellow-600 hover:to-yellow-800"style={{ borderRadius: '20px' }}
//           >
//             voir plus
//           </button>
//         </h5>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";

export default function CoverCard() {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-60 sm:bottom-16 left-0 w-full  md:mb-0 " style={{ marginBottom: '-130px' }}>
      <div className="p-1 w-3/4 md:w-1/2 lg:w-1/3 sm:p-8 md:p-12 mt-8 ml-4 md:ml-12 bg-[#fff]/70 rounded-lg" style={{ borderTopRightRadius: '50px' }}>
        <h5 className=" mb-4 text-sm md:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-[#515557]" style={{ textShadow: 'gray 2px 9px 13px', lineHeight: '4rem', md: 'lineHeight:4rem' }}>
          Investissez dans le confort , Investissez <br/> dans l'avenir
          <button
            onClick={() => navigate("/searchProject")}
            className="ml-2 inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-yellow-300 hover:from-yellow-600 hover:to-yellow-800"
            style={{ borderRadius: '20px' }}
          >
            voir plus
          </button>
        </h5>
      </div>
    </div>
  );
}
