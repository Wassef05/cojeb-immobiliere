import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Newsetter() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
    });
  }, []);

  return (
      <div>
        <div className="flex  my-10   overflow-hidden max-w-2xl mx-auto font-[sans-serif]">
          <input type="email" placeholder="EMAIL"
            className="w-full border-2 rounded-md mr-4 outline-none rounded-l-md bg-white text-gray-600 text-sm px-4 py-3" />
          <button type='button' className="flex rounded-md items-center justify-center px-5 text-sm text-white"
          style={{
            background: "linear-gradient(270deg, #B88824 0%, #E1C550 39%, #CEA93B 74%, #B07A12 100%)"
          }}
          >
          ENVOYER
          </button>
        </div>
      </div>
    );
}
