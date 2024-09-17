import React from 'react';
import { FaBath, FaCamera, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';


const ProjectCard = ({ projectInfo }) => {
  if (!projectInfo || !projectInfo.project) {
    return <div>Project data is missing</div>; 
  }

  const {
    address,
    etat,
    description,
    furnished,
    imgUrl,
    parking,
    title,
    _id,
    bureau,
    area
  } = projectInfo.project;

  const navigate = useNavigate();

  return (
    <div className="rounded-md bg-white shadow-lg hover:shadow-xl">
      <div
        onClick={() => navigate(`/projects/${_id}`)}
        className="relative flex items-end overflow-hidden rounded-md h-[200px] cursor-pointer"
      >
        <img
          className="hover:scale-105 object-cover h-full w-full duration-300"
          src={imgUrl[0]}
          alt="wallpaper"
        />
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-sm bg-[#3A5A40] px-2 py-1 shadow-md">
          <span className="text-xs text-white uppercase font-bold">
            {etat === 'future' ? 'Future' : etat === 'en cours' ? 'En cours' : etat === 'terminee' ? 'Terminé' : ''}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 inline-flex items-center rounded-sm px-2 py-1">
          <span className="text-xs text-white uppercase font-bold flex items-center">
            <FaCamera className="mr-1" />
            {imgUrl.length}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div onClick={() => navigate(`/projects/${_id}`)} className="cursor-pointer">
          <h2 className="text-[#3A5A40] font-bold text-xl truncate cursor-pointer">{title}</h2>
          <p className="mt-2 text-sm text-[#3A5A40] font-content font-bold truncate">
            <span className="font-medium">Address:</span> {address}
          </p>
          <div className="mt-3 flex items-end justify-start">
            <p className="text-[#3A5A40] w-1/2 font-content font-semibold text-sm flex items-center">
              <span className="font-bold font-bold mr-1">{etat}</span>
            </p>
          </div>
          <div className="mt-2 flex items-end justify-start">
            <p className="text-[#3A5A40] w-1/2 font-content font-semibold text-sm flex items-center">
              <FaCheck className={`mr-1 mt-[2px] ${parking ? 'text-green-600' : 'text-gray-400'}`} />
              parking
            </p>
            <p className="text-[#3A5A40] w-1/2 font-content font-semibold text-sm flex items-center">
              <FaCheck className={`mr-1 mt-[2px] ${furnished ? 'text-green-600' : 'text-gray-400'}`} />
              Espace Comercial
            </p>
            <p className="text-[#3A5A40] w-1/2 font-content font-semibold text-sm flex items-center">
              <FaCheck className={`mr-1 mt-[2px] ${bureau ? 'text-green-600' : 'text-gray-400'}`} />
              Bureau
            </p>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="inline-flex rounded-xl max-w-[150px] duration-500">
              <p className="font-bold text-lg truncate">
                {area ? area : 0}  <span className="font-content"> appartements</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <button
            onClick={() => navigate(`/update_project/${_id}`)}
            className="bg-[#3A5A40] rounded-sm py-2 px-7 font-bold text-white hover:opacity-95 text-sm"
          >
            Modifier
          </button>
          <button
            onClick={() => projectInfo.handleProjectDelete(_id)}
            className="bg-red-800 py-2 px-5 rounded-sm font-bold text-white hover:opacity-95 text-sm z-10"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
