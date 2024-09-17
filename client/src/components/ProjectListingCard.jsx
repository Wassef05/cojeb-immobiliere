import React from 'react'
import { FaBath, FaBed, FaChartArea, FaBookmark  , FaLocationArrow, } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';



const ProjectListingCard = ({ project }) => {


    const navigate = useNavigate();

    const { title, address, area, etat,discountPrice, imgUrl, offer, price, type,description , _id } = project;

    



    



    return (
        <div className="listing_card bg-transparant  rounded-lg w-full  group sm:mr-auto sm:ml-0 mx-auto shadow-lg shadow-gray-900"
        onClick={() => navigate(`/projects/${_id}`) }>
            <div className="card-container">
                <div
                    className="image_container relative overflow-hidden h-80 cursor-pointer items-center p-2"
                    
                >
                    <img
                        className='max-h-[350px] min-h-[300px] w-full object-cover rounded-lg hover:scale-105 duration-300 '
                        src={imgUrl[0]} alt="property image"
                    />
                </div>
                <div className="card_body  duration-500 mt-3 h-32  ">
                    <div
                        className="content-container p-3 pb-0 cursor-pointer"
                    >
                        <h2 className="text-lg text-black font-bold truncate uppercase duration-300 group-hover:text-black ">{title}</h2>
                        <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis"
                           style={{
                               display: '-webkit-box',
                               WebkitLineClamp: 3,
                               WebkitBoxOrient: 'vertical',
                               lineHeight: '1.2em',
                               maxHeight: '3.6em',
                               whiteSpace: 'normal',
                           }}>
                                                                                <div  dangerouslySetInnerHTML={{ __html: description }} />

                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProjectListingCard