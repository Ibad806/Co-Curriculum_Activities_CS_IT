import { useEffect, useState } from "react";
import { sponsors } from "../data";


export default function SmecSponsors() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white py-20">
      <h2 className="text-center text-4xl font-semibold mb-12 text-[#ddff1b]">Our Partners</h2>
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        <div className="w-1/3 flex justify-center">
          <span className="text-xl text-[#ddff1b]/50">{sponsors[(currentIndex + sponsors.length - 1) % sponsors.length].name}</span>
        </div>
        <div className="h-[200px] w-[400px] flex items-center justify-center overflow-hidden relative border-2 border-[#ddff1b] rounded-lg shadow-[0_0_10px_#ddff1b,0_0_10px_#ddff1b,0_0_30px_#ddff1b] animate-glow">
          <div className="h-[120px] w-[240px] flex items-center justify-center relative">
            <span className="text-2xl font-medium text-[#ddff1b] whitespace-nowrap">{sponsors[currentIndex].name}</span>
          </div>
        </div>
        <div className="w-1/3 flex justify-center">
          <span className="text-xl text-[#ddff1b]/50">{sponsors[(currentIndex + 1) % sponsors.length].name}</span>
        </div>
      </div>
    </div>
  );
}