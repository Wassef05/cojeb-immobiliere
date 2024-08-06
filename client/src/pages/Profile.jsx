import {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseApp } from '../firebase.js'
import { loddingStart, signoutFailed, signoutSuccess, userDeleteFail, userDeleteSuccess, userUpdateFailed, userUpdateSuccess } from '../redux/user/userSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import Loading from '../components/Loading.jsx';
import Footer from '../components/Footer.jsx';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSearch } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs'
import { setSearchTermState } from '../redux/search/searchSlice'
import { Card } from "flowbite-react";







const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [partnerData, setPartnerData] = useState({
    imgUrl: [],
  });
  const [partenaires,setPartenaires] = useState({})
 
  const handleAddPartner = async (e) => {
    e.preventDefault();
    
    if (partnerData.imgUrl.length > 0) {
      const file = partnerData.imgUrl[0];
      const fireBaseStorage = getStorage(firebaseApp);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(fireBaseStorage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error("File upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            try {
              const updatedPartnerData = {
                ...partnerData,
                imgUrl: downloadUrl,
              };
              console.log("Data to be sent:", updatedPartnerData);
  
              const res = await fetch("/api/partners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPartnerData),
              });
  
              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to add partner');
              }
  
              const data = await res.json();
  
              if (data.success) {
                toast.success("Partenaire ajouté avec succès");
              } else {
                toast.error(`Failed to add partner: ${data.message}`);
              }
            } catch (error) {
              toast.error(`An error occurred: ${error.message}`);
              console.error("Error details:", error);
            }
          });
        }
      );
    } else {
      toast.error("Please upload an image");
    }
    setIsModalOpen(false);
  };
  

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPartnerData({ ...partnerData, imgUrl: files });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [pageCount, setPageCount] = useState(1);

  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadingPerc, setUploadingPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { searchTermState } = useSelector((state) => state.search);
  const [formState, setFormState] = useState({
    searchTerm: "",
    parking: false,
    etat: "all",
    furnished: false,
  });
  const dispatch = useDispatch();
  const handleSubmit1 = (e) => {
    e.preventDefault();
    dispatch(setSearchTermState(""));
    setFormState({
      searchTerm: "",
      parking: false,
      etat: "all",
      furnished: false,
    });
  };
  const handleChange1 = (name, value) => {
    setPageCount(1);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [userProjects, setUserProject] = useState({
    isProjectExist: false,
    projects: [],
  });

  const [userProjectLoading, setUserProjectLoading] = useState(false);

  const fileRef = useRef(null);
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (file) {
      const fireBaseStorage = getStorage(firebaseApp);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(fireBaseStorage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingPerc(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, avatar: downloadUrl });
          });
        }
      );
    }
  };

  useEffect(() => {
    handleFileUpload(file);
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      dispatch(loddingStart());
      const res = await fetch(`api/users/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const userData = await res.json();

      //===checking reqest success or not ===//
      if (userData.success === false) {
        dispatch(userUpdateFailed(userData.message));

        //===showing error in tostify====//
        toast.error(userData.message, {
          autoClose: 5000,
        });
      } else {
        dispatch(userUpdateSuccess(userData));
        toast.success("Profile updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      dispatch(userUpdateFailed(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(loddingStart());
      const res = await fetch(`api/users/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const resData = await res.json();
      //===checking reqest success or not ===//
      if (resData.success === false) {
        dispatch(userDeleteFail(resData.message));

        //===showing error in tostify====//
        toast.error(resData.message, {
          autoClose: 2000,
        });
      } else {
        dispatch(userDeleteSuccess());
      }
    } catch (error) {
      dispatch(userDeleteFail(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleLogOut = async () => {
    try {
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailed(data.message));
        toast.error(data.message, {
          autoClose: 2000,
        });
      } else {
        dispatch(signoutSuccess());
        dispatch(clearSavedListing());
      }
    } catch (error) {
      dispatch(signoutFailed(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  // ======Loading User Posts  =====//

  const loadProject = async () => {
    try {
      setUserProjectLoading(true);
      const res = await fetch(
        `/api/projects/search?searchTerm=${searchTermState}&etat=${formState.etat}&parking=${formState.parking}&furnished=${formState.furnished}&page=${pageCount}`
      );
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, {
          autoClose: 2000,
        });
        setUserProjectLoading(false);
        dispatch(signoutSuccess());
      } else {
        setUserProject({
          ...userProjects,
          isProjectExist: true,
          projects: data,
        });
        setUserProjectLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
      setUserProjectLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [formState, searchTermState]);

  const loadPartenaires = async () => {
    try {
      const res = await fetch(
        `/api/partners/`
      );
      const data = await res.json();
        setPartenaires(
           data
        );
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    loadPartenaires();
  }, [partenaires]);

  const handleDeletePartenaire = async (id) => {
    try {
      const res = await fetch(`api/partners/${id}`, {
        method: "DELETE",
      });
      const resData = await res.json();
      //===checking reqest success or not ===//
      if (resData.success === false) {
        //===showing error in tostify====//
        toast.error(resData.message, {
          autoClose: 2000,
        });
      } else {
          alert("partenaire éffacée")      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };


  const handleProjectDelete = async (projectId) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      //===checking reqest success or not ===//
      if (data.success === false) {
        //===showing error in tostify====//
        toast.error(data.message, {
          autoClose: 2000,
        });
      } else {
        const restProject = userProjects.projects.filter(
          (project) => project._id !== projectId
        );
        setUserProject({
          ...userProjects,
          projects: restProject,
        });

        toast.success(data, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <>
      <section>
        <div className="w-full h-32  rounded-lg"></div>
         <div className="max-w-7xl sm:max-w-full mx-auto grid md:gap-6 temp lg:grid-cols-4  md:grid-cols-5 grid-cols-1 items-start">
          <div className="profile_info p-5 bg-white  w-full  md:col-span-2 lg:col-span-1  md:max-h-full md:min-h-screen h-full col-span-1 ">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="image_container w-full flex items-center justify-center  relative max-w-[100px] mx-auto">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                    accept="image/*"
                    type="file"
                    name="profile"
                    id="profile_image"
                    ref={fileRef}
                  />

                  <img
                    src={formData.avatar || currentUser.avatar}
                    onClick={() => fileRef.current.click()}
                    className="h-20 w-20 mb-3 rounded-full border-[1px]  border-[#3A5A40]"
                    alt="profile image"
                  />
                  <i className="h-4 w-4 rounded-full flex items-center justify-center bg-[#3A5A40] text-white absolute bottom-2 right-0">
                    <AiFillEdit />
                  </i>
                </div>

                {fileUploadError ? (
                  <p className="text-xs text-red-700 font-medium text-center">
                    File upload failed
                  </p>
                ) : uploadingPerc > 0 && uploadingPerc < 100 ? (
                  <p className="text-xs text-black font-medium text-center">
                    File uploading...{uploadingPerc}%
                  </p>
                ) : (
                  uploadingPerc === 100 && (
                    <p className="text-xs text-green-600 font-medium text-center">
                      File uploaded!!!
                    </p>
                  )
                )}
              </div>

              <label className="text-left font-heading text-sm pl-1 ">
                Nom d'utilisateur
              </label>
              <input
                defaultValue={currentUser.username}
                name="username"
                type="text"
                placeholder="Username"
                className="form_input bg-slate-200 rounded-md !pl-3 mt-1 !border-[1px] focus:!border-[#3A5A40] mb-3"
                onChange={handleChange}
              />

              <label className="text-left font-heading text-sm pl-1 ">
                Email
              </label>
              <input
                defaultValue={currentUser.email}
                name="email"
                type="email"
                placeholder="email"
                className="  form_input bg-slate-200 rounded-md !pl-3 !border-[1px] focus:!border-[#3A5A40] mb-3"
                onChange={handleChange}
              />

              <label className="text-left font-heading text-sm pl-1 ">
                Mot de Passe
              </label>
              <input
                type="password"
                name="password"
                placeholder="Mot de Passe"
                className="mt-1  form_input bg-slate-200 rounded-md !pl-3 !border-[1px] focus:!border-[#3A5A40]"
                onChange={handleChange}
              />

              <button
                disabled={loading}
                type="submit"
                className="py-2 px-5 bg-[#3A5A40] text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
              >
                {loading ? "Loading..." : "Enregistrer"}
              </button>
            </form>
           
                <button
                  onClick={handleLogOut}
                  className="py-2 px-5 bg-red-800 text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
                >
                  Deconnexion
                </button>
             
            <div className='h-[1px] bg-black w-full mt-3'></div>
            <button
              className="py-2 px-5 bg-[#3A5A40] text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
              onClick={() => setIsModelOpen(true)}
            >
              Tout partenaires
            </button>
            <button
              className="py-2 px-5 bg-[#3A5A40] text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
              onClick={() => setIsModalOpen(true)}
            >
              Ajouter partenaires
            </button>
          </div>
          {loading && <Loading />}
          
          <div
            id="adminAdd"
            className="mt-5 md:mt-0 col-span-3 post_section profile_info p-2 flex flex-col   bg-transparent  w-full overflow-y-auto"
          >
            {/*project items*/}
            <div id="Projects" className="">
              {userProjectLoading ? (
                <div>
                  <Loading />
                  <p className="text-[#3A5A40] text-center font-heading text-xl">
                    Loading your projects
                  </p>
                </div>
              ) : (
                <div>
                  {/*search*/}
                  <div className="">
                    <form /*onSubmit={handleSubmit1}*/>
                      <div className="grid grid-cols-3">
                        <div className="col-span-1">
                          <p className="text-lg font-heading "> type:</p>
                          <div className="flex flex-col lg:flex-row justify-between pr-10  pt-2">
                            <div>
                              <label className="flex items-center justify-start text-md font-heading">
                                <input
                                  className="h-4 w-4 mr-1 accent-[#3A5A40]"
                                  type="radio"
                                  name="etat"
                                  value={"all"}
                                  onChange={(e) =>
                                    handleChange1(e.target.name, e.target.value)
                                  }
                                  checked={formState.etat === "all"}
                                />
                                Tout
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center justify-start text-md font-heading">
                                <input
                                  className="h-4 w-4 mr-1 accent-[#3A5A40]"
                                  type="radio"
                                  name="etat"
                                  value={"en cours"}
                                  onChange={(e) =>
                                    handleChange1(e.target.name, e.target.value)
                                  }
                                  checked={formState.etat === "en cours"}
                                />
                                En Cours
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center justify-start text-md font-heading">
                                <input
                                  className="h-4 w-4 mr-1 accent-[#3A5A40]"
                                  type="radio"
                                  name="etat"
                                  value={"terminee"}
                                  onChange={(e) =>
                                    handleChange1(e.target.name, e.target.value)
                                  }
                                  checked={formState.etat === "terminee"}
                                />
                                Réalisé
                              </label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-heading">Amenities:</p>
                          <div className="flex flex-col lg:flex-row justify-between pr-10 pt-2">
                            <div className="mr-5">
                              <label className="flex items-center justify-start text-lg font-heading">
                                <input
                                  className="h-4 w-4 mr-1 accent-[#3A5A40]"
                                  type="checkbox"
                                  name="parking"
                                  onChange={(e) =>
                                    handleChange1(
                                      e.target.name,
                                      e.target.checked
                                    )
                                  }
                                  checked={formState.parking}
                                />
                                Parking
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center justify-start text-lg font-heading">
                                <input
                                  className="h-4 w-4 mr-1 accent-[#3A5A40]"
                                  type="checkbox"
                                  name="furnished"
                                  onChange={(e) =>
                                    handleChange1(
                                      e.target.name,
                                      e.target.checked
                                    )
                                  }
                                  checked={formState.furnished}
                                />
                                Meublées
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="btn_cotainer ">
                          <button
                            className="w-full mt-4 py-2 px-2 bg-[#3A5A40] text-white  hover:bg-[#3A5A40]/90 rounded-lg"
                            type="submit"
                          >
                            <span className="flex items-center justify-center font-heading text-lg">
                              <FaSearch className="mr-1" />
                              Effacer Recherche
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="grid post_card grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:h-full overflow-scroll pb-10 px-4 scrollbar-hide md:pt-5">
                    {/* ADD NEW Project BUTTON  */}
                    <div className="cursor-pointer rounded-md  bg-white  shadow-lg hover:shadow-xl">
                      <button
                        onClick={() => navigate("/create_project")}
                        type="submit"
                        className=" px-5 bg-slate-300 font-heading shadow-lg text-black text-lg  rounded-sm hover:opacity-95 w-full h-full flex justify-center items-center flex-col py-10 sm:py-10"
                      >
                        <BsFillPlusSquareFill className="text-center md:mb-3 md:text-5xl text-black text-sm sm:text-xl" />
                        Créer Projet
                      </button>
                    </div>

                    {userProjects.isProjectExist &&
                      paginate(
                        userProjects.projects.map((project) => (
                          <ProjectCard
                            key={project._id}
                            projectInfo={{ project, handleProjectDelete }}
                          />
                        ))
                      )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="join-item btn bg-[#3A5A40] text-white hover:bg-[#3A5A40]/90 
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]
                                                    "
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <FaAngleDoubleLeft />
                    </button>
                    <button className="join-item btn bg-[#3A5A40] hover:bg-[#3A5A40] cursor-default text-white">
                      Page {currentPage} /{" "}
                      {userProjects.projects.length % 5 == 0
                        ? Math.floor(userProjects.projects.length / 5)
                        : Math.floor(userProjects.projects.length / 5) + 1}
                    </button>
                    <button
                      className="join-item btn bg-[#3A5A40] text-white hover:bg-[#3A5A40]/90 
                                                    disabled:bg-[#d5d5d5] disabled:text-[#a0a0a0]
                                                    "
                      onClick={handleNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(userProjects.projects.length / itemsPerPage)
                      }
                    >
                      <FaAngleDoubleRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ToastContainer />
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 space-y-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Add New Partner</h2>
                <form onSubmit={handleAddPartner}>
                  <div>
                    <label className="block text-gray-700">Partner Image</label>
                    <input
                      type="file"
                      multiple
                      className="w-full px-4 py-2 border rounded"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className=' items-center text-center'>
                  <button type="submit" className="mt-2 px-4 py-2 bg-[#3A5A40] rounded text-white mx-5">
                    Add Partner
                  </button>
                  <button
                  className="px-4 py-2 bg-red-500 rounded text-white mx-5"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                  </div>
                  
                </form>
                
              </div>
            </div>
          )}
          {/*tout les partenaires*/}
          <ToastContainer />
          {isModelOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 py-16">
              <div className="bg-white rounded-lg  space-y-4 w-full h-full mx-16  text-center">
                <h2 className="text-xl font-bold   rounded-b-xl pt-5 pb-2">Les partenaires</h2>
                <div className='h-[60vh] overflow-y-auto grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 border-gray-800'>
                {partenaires.map((partner, index) => (
                  <div key={index} className="">
                    <Card className="max-w-sm shadow-white bg-transparent border-0 mx-auto rounded-lg">
                      <img src={partner.imgUrl[0]} alt={`Partner logo for ${partner._id}`} className="max-h-[200px] min-h-[200px] w-auto object-contain rounded-lg hover:scale-105 duration-300" />
                      <button className='px-4 py-2 bg-red-800 rounded text-white mx-5' onClick={()=>handleDeletePartenaire(partner._id)}>Effacer</button>
                    </Card>
          </div>
        ))}

                </div>
                  <button
                  className="px-4 py-2 bg-red-500 rounded text-white mx-5"
                  onClick={() => setIsModelOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
        <ToastContainer />
      </section>
      <Footer />
    </>
  );
}

export default Profile
