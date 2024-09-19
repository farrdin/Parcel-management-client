import { useState, useRef, useEffect } from "react";
import banner from "../../assets/Banner/Banner1.jpeg";
import animate from "../../assets/Banner/Banner.json";
import { Fade, Slide } from "react-awesome-reveal";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const lottieRef = useRef();
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5);
    }
  }, []);
  const handleSearch = () => {
    if (searchTerm) {
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <div
      className="relative w-full h-[400px] bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 space-y-6 md:space-y-0 md:w-[80%] mx-auto">
        <div className="flex-1 flex flex-col  justify-center space-y-3 lg:space-y-5 text-headD font-open">
          <Slide>
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
              Welcome to ParcelPro
            </h1>
          </Slide>
          <Fade delay={1000}>
            <p className="text-base max-w-2xl">
              <Typewriter
                words={[
                  "Your Trusted Solution for Parcel Management",
                  "Fast, Secure, Reliable Deliveries",
                  "Track Your Parcels in Real-Time",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </p>
          </Fade>
          <Fade delay={1500}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-full md:w-60 lg:w-80 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-link focus:outline-none"
                placeholder="Search parcels, services,Deliveryman"
              />
              <button
                className="px-6 py-2 bg-[#FF5757] hover:bg-red-600 text-white font-semibold rounded-md transition-all duration-300 w-full md:w-auto"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </Fade>
        </div>

        <div className="hidden flex-1 md:flex justify-center">
          <Slide direction="right">
            <Lottie
              lottieRef={lottieRef}
              animationData={animate}
              className="w-full lg:w-[80%]"
              loop={true}
            />
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Banner;
