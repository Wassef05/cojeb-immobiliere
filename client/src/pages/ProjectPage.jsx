import  { useEffect, useState } from 'react'
import { useNavigate, useParams,useLocation  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsArrowRight, BsArrowLeft, } from "react-icons/bs";
import { BiSolidArea } from 'react-icons/bi'
import { FaLocationArrow, FaBed, FaBath, FaAngleUp, FaAngleDown, FaShare, FaLock, FaBookmark } from "react-icons/fa"
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Carousel3 from '../components/AddedComponents/Carousel3';
import 'react-quill/dist/quill.snow.css';




const ProjectPage = () => {
    const location = useLocation();
    const [listings, setListings] = useState({})
    const [isFeatureActive, setIsFeatureActive] = useState(false)
    const [loading, setLoading] = useState(false)           
    const { area, address, bath, bed, description, bureau,Appartements, furnished, offer, parking, title, type, _id, userRef } = listings;

    const navigate = useNavigate()
    const params = useParams();
    const { currentUser } = useSelector(state => state.user)


    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
}, [location]);


    //====== Loading Project Data Here ======//
    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            setLoading(true)
            const res = await fetch(`/api/projects/${params.id}`)
            const json = await res.json();
            if (json.success === false) {
                toast.error(json.message, {
                    autoClose: 2000,
                })
                setLoading(false)
            }
            else {
                setListings(json)
                setLoading(false)
                
            }
        })()
    }, [params.id])


      // Ajoutez cet effet pour activer automatiquement la lecture des vidéos MP4
      useEffect(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.muted = false;
            video.play();
        });
    }, [listings]);

    //====SLider Functions=====//
    function SamplePrevArrow({ onClick }) {
        return (
            <div
                className='absolute top-1/2 left-0 z-10  -translate-y-1/2 p-2 sm:p-4 rounded-e-md bg-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/90 duration-300'
                onClick={onClick}
            >
                <BsArrowLeft className='text-[#3A5A40] text-lg sm:text-2xl' />
            </div>
        )
    }
    function SampleNextArrow({ onClick }) {
        return (
            <div
                className='absolute top-1/2 right-0 z-10  -translate-y-1/2 p-2 sm:p-4 rounded-s-md bg-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/90 duration-300'
                onClick={onClick}
            >
                <BsArrowRight className='text-[#3A5A40] text-lg sm:text-2xl' />
            </div>
        )
    }
    

    const settings = {
        infinite: true,
        lazyLoad: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
        appendDots: dots => (
            <div style={{ bottom: 25, }}>
                <ul style={{ margin: "0px", color: '#fff' }}> {dots} </ul>
            </div>
        ),
    };


    // ======Handling User Project DELETE  =====//
    const handleProjectDelete = async (projectId) => {
        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            })
            const data = await res.json();



            //===checking reqest success or not ===//
            if (data.success === false) {
                //===showing error in tostify====//
                toast.error(data.message, {
                    autoClose: 2000,
                })
            }
            else {
                navigate('/profile')
            }
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
        }
    }
    function removeLastNCharacters(url, numChars) {
        if (typeof url === 'string' && url.length > numChars) {
            return url.slice(0, -numChars);
        }
        return url; // Return original URL if it's shorter than or equal to numChars
    }
    function isMp4(fileName) {
        console.log(fileName)
        return fileName.endsWith('.mp4');
    }


   
   

    return (
        <>
            {
                loading
                    ?
                    <>
                        <Loading />
                        <p className='text-[#3A5A40] text-center font-heading text-xl'>Loading your project..</p>
                    </>
                    :
                    <div className="listing_section pb-16">
                              <div className="w-full h-32 "></div>

<Slider {...settings} className='z-10 relative'>
                                {listings.imgUrl && listings.imgUrl.map((listing, index) => (
                                    <div key={index} className="w-full mx-auto z-10">
                                        {isMp4(removeLastNCharacters(listing, 53)) ?
                                            <video 
                                                className='h-[200px] sm:h-[450px] mx-auto rounded-lg rounded-b-lg' 
                                                src={listing} 
                                                alt="video" 
                                                autoPlay 
                                                controls 
                                                 
                                            />
                                            :
                                            <img 
                                                className='h-[200px] sm:h-[450px] mx-auto rounded-lg rounded-b-lg' 
                                                src={listing} 
                                                alt="image" 
                                            />
                                        }
                                    </div>
                                ))}
                            </Slider>



                        <div className="container ">
                            <div className="property_details_container pt-4 sm:pt-12 ">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                    <div className="lg:col-span-7  ">
                                        <div className='bg-white md:p-12 p-6 rounded-md shadow-sm shadow-[#3A5A40]'>
                                            <div className="property_info">
                                                {/* <p className='font-heading text-[#3A5A40]'>
                                                    <span className='py-2 px-6 bg-[#3A5A40]/40 rounded-full border border-[#3A5A40] uppercase'>
                                                        {type}
                                                    </span>
                                                </p> */}

                                                <h1 className='font-heading font-bold mt-5 md:mt-8 text-2xl sm:text-3xl text-black capitalize'>
                                                    {title}
                                                </h1>
                                                <p className='font-content mt-3 font-medium text-lg flex items-center justify-left'>
                                                    <FaLocationArrow className='text-[#3A5A40]' />
                                                    <span className='ml-1'>
                                                        {address}
                                                    </span>
                                                </p>

                                                <div className="description">
                                                    <p className='font-heading mt-4 font-medium text-lg sm:text-xl'>Description</p>
                                                    <div  dangerouslySetInnerHTML={{ __html: description }} />
                                                </div>

                                                
                                            </div>


                                            

                                        </div>


                                        {/* Feature Content Section */}

                                        <div className={`property_details mt-8 bg-white rounded-md shadow-sm shadow-[#3A5A40] md:px-12 py-5 px-6 ${ currentUser && currentUser.role ==="admin" ? "block":"hidden"}`}>
                                            <div
                                                onClick={() => setIsFeatureActive(!isFeatureActive)}
                                                className="feature_heading flex items-center justify-between cursor-pointer"
                                            >
                                                <p className='font-heading text-lg sm:text-xl font-extrabold'>Details & Caracteristiques</p>
                                                {
                                                    isFeatureActive
                                                        ?
                                                        <i className='p-[5px] rounded-full bg-[#3A5A40]/20 flex items-center justify-center'>
                                                            <FaAngleUp className='text-xl text-[#3A5A40]' />
                                                        </i>
                                                        :
                                                        <i className='p-[5px] rounded-full bg-[#3A5A40]/20 flex items-center justify-center'>
                                                            <FaAngleDown className='text-xl text-[#3A5A40]' />
                                                        </i>
                                                }
                                            </div>
                                            <div className={`feature_info  transition-max-h ${isFeatureActive ? 'max-h-screen' : 'max-h-0'} overflow-hidden duration-500 ease-in-out`}>
                                                <div className="info_contaier mt-5 max-w-md ">
                                                    <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                            Parking
                                                        </p>
                                                        <p className={`font-heading ${parking ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                            {
                                                                parking ? "oui" : 'Non'
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                            Espace Comercial
                                                        </p>
                                                        <p className={`font-heading ${furnished ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                            {
                                                                furnished ? "OUI" : 'Non'
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                            Bureau
                                                        </p>
                                                        <p className={`font-heading ${bureau ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                            {
                                                                bureau ? "Oui" : 'Non'
                                                            }
                                                        </p>
                                                    </div>
                                                    {/* <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                            Appartements
                                                        </p>
                                                        <p className={`font-heading ${Appartements ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                            {
                                                                Appartements ? "Oui" : 'Non'
                                                            }
                                                        </p>
                                                        
                                                    </div> */}
                                                    {Appartements===0?
                                                    <></>
                                                    :
                                                         <div className="grid grid-cols-2 mt-2">
                                                         <p className='font-heading text-md lg:text-lg '>
                                                         Appartements
                                                         </p>
                                                         <p className={`font-heading ${furnished ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                             {
                                                                 area
                                                             }
                                                         </p>
                                                     </div>

                                                    }
                                                   
                                                    {
                                                        offer &&
                                                        <div className="grid grid-cols-2 mt-2">
                                                            <p className='font-heading text-md lg:text-lg '>
                                                                Price
                                                            </p>
                                                            <p className='font-heading  text-md lg:text-2xl '>
                                                                ${discountPrice} <span>
                                                                    <s className='text-gray-400 text-lg'>${price}</s>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="lg:col-span-5">
                                        <div className="bg-white md:p-12 p-6 rounded-md shadow-sm shadow-[#3A5A40]">

                                            {
                                                currentUser && currentUser.role ==="admin"
                                                    ?
                                                    <div className="project_owner">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 gap-2 ">
                                                            <div className="btn_container">
                                                                <button
                                                                    onClick={() => navigate(`/update_project/${params.id}`)}
                                                                    className='bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white w-full px-2 py-3 text-lg font-heading rounded-sm'>
                                                                    Modifier Project
                                                                </button>
                                                            </div>
                                                            <div className="contant_btn_container">
                                                                <button
                                                                    onClick={() => handleProjectDelete(params.id)}
                                                                    className='bg-red-600 hover:bg-red-600/90 text-white w-full px-2 py-3 text-lg font-heading rounded-sm'>
                                                                    Supprimer Project
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="contant_btn_container mt-3">
                                                            <button
                                                                onClick={() => navigate(`/profile`)}
                                                                className='bg-amber-700 hover:bg-amber-700/90 uppercase text-white w-full px-2 py-3 text-lg font-heading rounded-sm'>
                                                                Tous les Projects
                                                            </button>
                                                        </div>
                                                    </div>
                                             :
                                             
                                            <div className={`feature_info  transition-max-h max-h-screen overflow-hidden duration-500 ease-in-out`}>
                                                                                                <p className='font-heading text-lg sm:text-xl font-extrabold'>Details & Caracteristiques</p>

                                                <div className="info_contaier mt-5 max-w-md ">
                                                    <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                            Parking
                                                        </p>
                                                        <p className={`font-heading ${parking ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                            {
                                                                parking ? "Yes" : 'No'
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                            esspace commercial
                                                        </p>
                                                        <p className={`font-heading ${furnished ? "text-black" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                            {
                                                                furnished ? "Yes" : 'No'
                                                            }
                                                        </p>
                                                    </div>
                                                    {/* <div className="grid grid-cols-2 mt-2">
                                                        <p className='font-heading text-md lg:text-lg '>
                                                        Appartements
                                                        </p>
                                                        <p className='font-heading  text-md lg:text-lg '>
                                                            {area} 
                                                        </p>
                                                    </div> */}
                                                    {
                                                        offer &&
                                                        <div className="grid grid-cols-2 mt-2">
                                                            <p className='font-heading text-md lg:text-lg '>
                                                                Price
                                                            </p>
                                                            <p className='font-heading  text-md lg:text-2xl '>
                                                                ${discountPrice} <span>
                                                                    <s className='text-gray-400 text-lg'>${price}</s>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        
                                            }
                                                                    
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
            }
            <Carousel3/>
            <Footer/>
        </>
    )
}

export default ProjectPage