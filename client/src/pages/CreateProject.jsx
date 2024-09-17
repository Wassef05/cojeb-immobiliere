/*<div dangerouslySetInnerHTML={{ __html: content }} />*/
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { firebaseApp } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [content, setContent] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState([]);
  const [uploadError, setUploadError] = useState({
    isError: false,
    message: "",
  });
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [isOffer, setIsoffer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imgUrl: [],
  });

  const [description, setDescription] = useState(""); // État pour la description
  const [specificity, setSpecificity] = useState(""); // État pour la spécificité

  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("admin").hidden = true;
    if (currentUser.role === "admin") {
      document.getElementById("admin").hidden = false;
    }
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleImageUpload = async () => {
    if (
      imageFile.length > 0 &&
      imageFile.length + formData.imgUrl.length < 13
    ) {
      setLoading(true);
      const promises = [];
      for (let i = 0; i < imageFile.length; i++) {
        promises.push(uploadToFirebase(imageFile[i]));
        Promise.all(promises)
          .then((urls) => {
            setFormData({ ...formData, imgUrl: formData.imgUrl.concat(urls) });
            setLoading(false);
          })
          .catch((error) => {
            setUploadError({ ...uploadError, isError: true, message: error });
            setLoading(false);
          });
      }
    } else {
      setUploadError({
        ...uploadError,
        isError: true,
        message: "Select file first (max:12)",
      });
      setLoading(false);
    }
  };

  const uploadToFirebase = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(firebaseApp);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject("File uploaded Falied");
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDelete = (index) => {
    setFormData({
      ...formData,
      imgUrl: formData.imgUrl.filter(
        (items) => items != formData.imgUrl[index]
      ),
    });
  };

  uploadError.isError &&
    toast.error(uploadError.message, {
      autoClose: 2000,
    });

    const handleFormSubmit = async (data) => {
      try {
        setFormSubmitLoading(true);
        const res = await fetch("api/projects/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            description: description,  
            specificity: specificity,  
            imgUrl: formData.imgUrl,
            userRef: currentUser._id,
          }),
        });
        
        const serverRes = await res.json();
        if (serverRes.success === false) {
          toast.error(serverRes.message, {
            autoClose: 2000,
          });
          setFormSubmitLoading(false);
        } else {
          navigate(`/projects/${serverRes._id}`);
          setFormSubmitLoading(false);
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 2000,
        });
        setFormSubmitLoading(false);
      }
    };
    

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"], 
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  return (
    <main>
      <section id="admin">
        <div className="w-full h-24  rounded-lg"></div>{" "}
        <div className="container py-7 md:py-16 max-w-5xl">
          <h1 className="text-center text-2xl font-heading font-bold text-black">
            Créer un Projet
          </h1>
          <div className="mt-8 form_container">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="feilds_container grid gap-5 md:gap-10  grid-col-1 md:grid-cols-2 items-start  ">
                
                <div className="info_container">
                  <div className="input_feilds">
                    <input
                      id="title"
                      type="text"
                      placeholder="Property name"
                      name="title"
                      className="form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm "
                      min={10}
                      max={50}
                      {...register("title", {
                        required: "This feild is required*",
                      })}
                    />
                    {errors.title && (
                      <p className="text-gray-800 text-xs">
                        {errors.title.message}
                      </p>
                    )}

                    <ReactQuill
                      id="description"
                      type="text"
                      placeholder="Description"
                      value={description}
                      className="form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm mt-3"
                      onChange={setDescription}
                      modules={modules}
                      formats={formats}
                    />

                     

                    <input
                      id="address"
                      type="text"
                      placeholder="Address"
                      name="address"
                      className="form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm mt-3"
                      {...register("address", {
                        required: "This feild is required*",
                      })}
                    />
                    {errors.address && (
                      <p className="text-gray-800 text-xs font-semibold">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="additional_info mt-6 max-w-xs">
                    <div className="property_type">
                      <p className="font-heading text-black">
                        Selectionner l'etat{" "}
                      </p>

                      <div className="form-control ">
                        <label
                          className="label cursor-pointer flex items-center justify-start gap-2
                                            "
                        >
                          <input
                            type="radio"
                            name="rent"
                            id="rent"
                            value={"future"}
                            required
                            className="radio w-5 h-5 checked:bg-[#3A5A40]"
                            {...register("etat")}
                          />
                          <span className="label-text font-medium">Future</span>
                        </label>
                        <label
                          className="label cursor-pointer flex items-center justify-start gap-2
                                            "
                        >
                          <input
                            type="radio"
                            name="rent"
                            id="rent"
                            value={"en cours"}
                            required
                            className="radio w-5 h-5 checked:bg-[#3A5A40]"
                            {...register("etat")}
                          />
                          <span className="label-text font-medium">
                            en cours
                          </span>
                        </label>
                        <label
                          className="label cursor-pointer flex items-center justify-start gap-2
                                            "
                        >
                          <input
                            type="radio"
                            name="rent"
                            id="rent"
                            value={"terminee"}
                            required
                            className="radio w-5 h-5 checked:bg-[#3A5A40]"
                            {...register("etat")}
                          />
                          <span className="label-text font-medium">
                            termine
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="cd_info mt-3">
    <p className='font-heading text-black'> Informations Générales</p>
    <div className="max-w-[200px] flex items-center justify-between gap-2 mt-2">
        <span className='label-text font-medium'>Appartement</span>
        <div>
            <input
                defaultValue={0}
                className='border-2 focus:border-[#3A5A40] rounded-md max-w-[84px] py-1 px-2 bg-transparent'
                type="number"
                name="area"
                id="area"
                {...register('area', { required: 'required' })}
            />
            {errors.area && <p className='text-gray-800 text-xs font-semibold'>{errors.area.message}</p>}
        </div>
    </div>
</div>

<div className="additional_feature mt-3">
    <p className='font-heading text-black'>Information Additionnelle</p>
    <div className="form-control">
        <label className="label cursor-pointer flex items-center justify-start gap-2">
            <input
                id='parking'
                type="checkbox"
                name='parking'
                className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-[#3A5A40]"
                {...register('parking')}
            />
            <span className="label-text font-medium">Parking</span>
        </label>
        <label className="label cursor-pointer flex items-center justify-start gap-2">
            <input
                id='furnished'
                type="checkbox"
                className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-[#3A5A40]"
                {...register('furnished')}
            />
            <span className="label-text font-medium">Espace Comercial</span>
        </label>
        <label className="label cursor-pointer flex items-center justify-start gap-2">
            <input
                id='bureau'
                type="checkbox"
                name='bureau'
                className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-[#3A5A40]"
                {...register('bureau')}
            />
            <span className="label-text font-medium">Bureau</span>
        </label>
    </div>
</div>

                    <div className="specificity mt-3">
                      <p className="font-heading text-black">Spécificité</p>
                      <ReactQuill
                        id="specificity"
                        type="text"
                        value={specificity} 
                        onChange={setSpecificity} 
                        className="border-2 focus:border-[#3A5A40] rounded-md w-full mt-2"
                        placeholder="Description de la spécificité..."
                        modules={modules} 
                        formats={formats} 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-content text-[16px] mb-3 font-normal text-black">
                    <span className="font-semibold mr-1">Note:</span>
                    La premiére image sera l'image de couverture (max:12)
                  </p>
                  <div className="image_upload_container md:p-5 md:border-2 bg-transparent border-dashed rounded-sm md:flex items-center justify-center gap-2">
                    <input
                      onChange={(e) => setImageFile(e.target.files)}
                      required
                      multiple
                      accept="video/mp4, image/*"
                      type="file"
                      className={`file-input file:bg-[#3A5A40] ${
                        loading ? "md:w-4/6" : "md:w-4/5"
                      } w-full`}
                    />
                    <button
                      disabled={loading || imageFile.length === 0}
                      onClick={handleImageUpload}
                      type="button"
                      className={`w-full text-green-600 text-sm py-2 border-2 border-green-600 rounded-md mt-2 uppercase font-heading  ${
                        loading ? "md:w-2/6" : "md:w-1/5"
                      } md:h-[3rem] md:mt-0 duration-500 hover:shadow-lg disabled:border-gray-500 disabled:text-gray-500`}
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                  <div>
                    {formData.imgUrl.length > 0 &&
                      formData.imgUrl.map((imgSrc, index) => {
                        return (
                          <div
                            key={index}
                            className="uploaded_images p-2 pr-5 border-2 mt-4  rounded-md flex items-center justify-between"
                          >
                            <img
                              src={imgSrc}
                              alt="property Image"
                              className="w-24 h-20 object-cover rounded-md"
                            />
                            <button
                              onClick={() => handleDelete(index)}
                              type="button"
                              className="font-medium text-lg text-gray-800 flex items-center underline hover:opacity-75"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                    <div className="post_btn mt-7">
                      <button
                        disabled={
                          formData.imgUrl.length < 1 ||
                          loading ||
                          formSubmitLoading
                        }
                        type="submit"
                        className="w-full bg-[#3A5A40] text-xl tracking-wider font-heading rounded-md hover:opacity-90 disabled:opacity-70 duration-300 text-white p-3"
                      >
                        {formSubmitLoading ? "Creating..." : "Create Project"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </section>
    </main>
  );
};

export default CreateProject;
