import  { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa'
import  ProjectListingCard from '../components/ProjectListingCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTermState } from '../redux/search/searchSlice'
import Footer from '../components/Footer'
import { LuSearchX } from "react-icons/lu";

const SearchProject = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const [projects, setProjects] = useState([])
    const { searchTermState } = useSelector(state => state.search)
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const scrollRef = useRef();

    const [formState, setFormState] = useState({
        searchTerm: "",
        parking: false,
        etat: "all",
        furnished: false,

    })
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setSearchTermState(""))
        setFormState({
            searchTerm: "",
            parking: false,
            etat: "all",
            furnished: false,

        })
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filter = params.get('filter');
        if (filter) {
            setFormState(prevState => ({ ...prevState, etat: filter }));
        }
    }, [location.search]);

    const fetchListings = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/projects/search?searchTerm=${searchTermState}&etat=${formState.etat}&parking=${formState.parking}&furnished=${formState.furnished}&page=${pageCount}`)
            const json = await res.json();
            if (json.success === false) {
                setLoading(false)
            }
            else {
                setProjects(json)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchListings();
    }, [formState, searchTermState, pageCount]);


    const handleChange = (name, value) => {
        setPageCount(1)
        setFormState({
            ...formState,
            [name]: value
        })
    }

    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [projects])

    return (
        <>
            <section  >
                <div ref={scrollRef}>
                <div className="w-full h-32 rounded-lg"></div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:max-h-full lg:min-h-screen">
                        <div className="option_contaienr md:col-span-3 mt-1 bg-white lg:max-h-full lg:min-h-screen">
                            <div className="items_cotainer p-5 py-8 ">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-control w-full max-w-full   sm:max-w-full relative">
                                        <input

                                            type="text"
                                            placeholder="Rechercher..."
                                            className="search sm:max-w-full"
                                            onChange={e => dispatch(setSearchTermState(e.target.value))}
                                            value={searchTermState}
                                        />
                                        <button type='submit' className='search_btn   bg-[#3A5A40]'>
                                            <i className='text-center text-white font-bold'><BsSearch /></i>
                                        </button>
                                    </div>
                                    <div className="feilds_cotainer mt-4">
                                        <div className="feilds max-w-xs">
                                            <p className='text-lg font-heading '> type:</p>
                                            <div className="control flex flex-row md:flex-col items-center md:items-start xl:flex-row xl:items-center justify-between mt-1">
                                                <div>
                                                    <label className="flex items-center justify-start text-md font-heading">
                                                        <input
                                                            className='h-4 w-4 mr-1 accent-[#3A5A40]' type="radio"
                                                            name="etat"
                                                            value={"all"}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                            checked={formState.etat === "all"}
                                                        />
                                                        Tout
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center justify-start text-md font-heading">
                                                        <input
                                                            className='h-4 w-4 mr-1 accent-[#3A5A40]' type="radio"
                                                            name="etat"
                                                            value={"en cours"}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                            checked={formState.etat === "en cours"}
                                                        />
                                                        En Cours
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center justify-start text-md font-heading">
                                                        <input
                                                            className='h-4 w-4 mr-1 accent-[#3A5A40]' type="radio"
                                                            name="etat"
                                                            value={"terminee"}
                                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                            checked={formState.etat === "terminee"}
                                                        />
                                                        Réalisé
                                                    </label>
                                                </div>

                                            </div>

                                            {/* // Amenities Section  */}
                                            <div className="aminities_container mt-4">
                                                <p className='text-lg font-heading'>Amenities:</p>
                                                <div className="control flex flex-row md:flex-col items-center md:items-start xl:flex-row xl:items-center justify-start mt-1">
                                                    <div className='mr-5'>
                                                        <label className="flex items-center justify-start text-lg font-heading">
                                                            <input
                                                                className='h-4 w-4 mr-1 accent-[#3A5A40]' type="checkbox"
                                                                name="parking"
                                                                onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                                                checked={formState.parking}
                                                            />
                                                            Parking
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="flex items-center justify-start text-lg font-heading">
                                                            <input
                                                                className='h-4 w-4 mr-1 accent-[#3A5A40]' type="checkbox"
                                                                name="furnished"
                                                                onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                                                checked={formState.furnished}
                                                            />
                                                            Meublées
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>

                                            


                                        </div>
                                        <div className="btn_cotainer w-full">
                                            <button
                                                className='w-full mt-4 py-2 px-2 bg-[#3A5A40] text-white rounded-sm hover:bg-[#3A5A40]/90'

                                                type='submit'
                                            >
                                                <span className='flex items-center justify-center font-heading text-lg'>
                                                    <FaSearch className='mr-1' />
                                                    Effacer Recherche
                                                </span>
                                            </button>
                                        </div>
                                    </div>


                                </form>

                            </div>
                        </div>
                        <div className="listing_container  md:col-span-9 pb-10 pt-2">
                            {
                                loading
                                    ?
                                    <div className="loading_container mt-40 flex items-center justify-center flex-col">
                                        <FaSearch className='font-xl text-[#3A5A40] font-bold text-xl text-center' />
                                        <p className='font-heading text-lg text-center text-[#3A5A40] '>Searching...</p>
                                    </div>
                                    :

                                    <div>
                                        {
                                            projects.length !== 0 ?
                                                <>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-5 gap-y-8">
                                                        {
                                                            projects && projects.map(project => <ProjectListingCard key={project._id} project={project} />)
                                                        }
                                                    </div>
                                                    <div className="pageination_part mt-8 md:mt-14 w-full flex items-center justify-center">
                                                        <div className="join">


                                                            {/* prev Btn  */}
                                                            <button
                                                                onClick={() => setPageCount(pageCount - 1)}
                                                                disabled={pageCount <= 1 || loading}
                                                                className="join-item btn bg-[#3A5A40] text-white hover:bg-[#3A5A40]/90 
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]
                                                    "
                                                            >
                                                                <FaAngleDoubleLeft />
                                                            </button>


                                                            <button
                                                                className="join-item btn bg-[#3A5A40] hover:bg-[#3A5A40] cursor-default text-white"
                                                            >Page {pageCount}
                                                            </button>


                                                            {/* Next Btn  */}
                                                            <button
                                                                onClick={() => setPageCount(pageCount + 1)}
                                                                disabled={projects.length -((pageCount-1)*12) < 12 || loading}
                                                                className="join-item btn bg-[#3A5A40] text-white hover:bg-[#3A5A40]/90
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]"
                                                            >
                                                                <FaAngleDoubleRight />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <div className=" mt-40 flex items-center justify-center flex-col">
                                                    <LuSearchX className='font-3xl text-[#3A5A40] font-bold text-xl text-center' />
                                                    <p className='font-heading text-lg text-center text-[#3A5A40] '>Sorry, Listings not found</p>
                                                </div>

                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <>
                <Footer />
            </>
        </>
    )
}

export default SearchProject