import { useEffect, useState } from "react";
import { sponsors } from "../data";

export default function SmecSponsors() {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(sponsors);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white py-20">
      <h2 className="text-center text-4xl font-semibold mb-12 text-[#ddff1b]">Our Partners</h2>
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        {/* Previous Sponsor Image */}
        <div className="w-1/3 flex justify-center">
          <img
            src={sponsors[(currentIndex + sponsors.length - 1) % sponsors.length].image}
            alt="Previous Sponsor"
            className="h-[120px] w-[240px] object-contain opacity-50 transition-all duration-2000 ease-in-out transform translate-x-[-100%]"
          />
        </div>

        {/* Current Sponsor Image */}
        <div className="h-[200px] w-[400px] flex items-center justify-center overflow-hidden relative border-2 border-[#ddff1b] rounded-lg shadow-[0_0_10px_#ddff1b,0_0_10px_#ddff1b,0_0_30px_#ddff1b] animate-glow">
          <div className="h-[120px] w-[240px] flex items-center justify-center relative">
            <img
              src={sponsors[currentIndex].image}
              alt="Current Sponsor"
              className="h-full w-full object-contain opacity-100 transition-all duration-2000 ease-in-out transform translate-x-0"
            />
          </div>
        </div>

        {/* Next Sponsor Image */}
        <div className="w-1/3 flex justify-center">
          <img
            src={sponsors[(currentIndex + 1) % sponsors.length].image}
            alt="Next Sponsor"
            className="h-[120px] w-[240px] object-contain opacity-50 transition-all duration-2000 ease-in-out transform translate-x-[100%]"
          />
        </div>
      </div>
    </div>
  );
}
