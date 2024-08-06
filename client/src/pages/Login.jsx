import SingIn from '../components/SingIn'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { useEffect } from 'react'





const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
            <div className="w-full h-32  rounded-lg"></div>
                    <section className='form-section py-10 md:py-20 '>
                        <div className="container ">
                            <div className="form-container px-4 sm:px-8 bg-white py-6 pb-8 sm:py-9 sm:pb-12 max-w-lg mx-auto rounded-sm border-[1px] border-[#3A5A40]/50 shadow-brand shadow-[#3A5A40]/40">
                                <h1 className='text-left text-[#3A5A40] mb-3 font-medium font-heading text-md sm:text-xl'>
                                     Login 
                                </h1>
                                <SingIn />
                                <ToastContainer limit={0} />
                            </div>
                        </div>
                    </section>
            

                <Footer />
            
        </>
    )
}

export default Login