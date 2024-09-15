import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import banner1 from "../../assets/Banner/Banner1.jpg";
import banner2 from "../../assets/Banner/Banner2.jpg";
import banner3 from "../../assets/Banner/Banner3.jpg";
import banner4 from "../../assets/Banner/Banner4.jpg";
import banner5 from "../../assets/Banner/Banner5.jpg";
import { Fade, Slide } from "react-awesome-reveal";

const Banner = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 8500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <img className="w-full h-[400px]" src={banner1} />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, .9))",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-10 ">
              <h1 className="text-center leading-10 text-3xl font-raleway font-medium w-2/3 mx-auto">
                <>
                  <Slide>
                    <h1 className="text-[#F3F4F6]">Welcome to ParcelPro</h1>
                  </Slide>
                  <Fade
                    className="text-[#F3F4F6]"
                    delay={1e3}
                    cascade
                    damping={1e-1}
                  >
                    Your Trusted Solution for Effortless Parcel Management
                  </Fade>
                </>
              </h1>
              <button
                className="px-8 py-3 bg-butL dark:bg-butD text-headD dark:text-headL font-raleway text-base font-semibold hover:bg-butD dark:hover:bg-butL rounded-xl"
                onClick={() => scrollToSection("category")}
              >
                View Categories
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img className="w-full h-[400px]" src={banner2} />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, .9))",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-10 ">
              <h1 className="text-center leading-10 text-3xl font-raleway font-medium w-2/3 mx-auto">
                <>
                  <Slide>
                    <h1 className="text-[#F3F4F6]">Welcome to CraftyHub</h1>
                  </Slide>
                  <Fade
                    className="text-[#F3F4F6]"
                    delay={1e3}
                    cascade
                    damping={1e-1}
                  >
                    Your Trusted Solution for Effortless Parcel Management
                  </Fade>
                </>
              </h1>
              <button
                className="px-8 py-3 bg-butL dark:bg-butD text-headD dark:text-headL font-raleway text-base font-semibold hover:bg-butD dark:hover:bg-butL rounded-xl"
                onClick={() => scrollToSection("category")}
              >
                View Categories
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="w-full h-[400px]" src={banner3} alt="Banner 3" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, .9))",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-10 ">
              <h1 className="text-center leading-10 text-3xl font-raleway font-medium w-2/3 mx-auto">
                <>
                  <Slide>
                    <h1 className="text-[#F3F4F6]">Welcome to CraftyHub</h1>
                  </Slide>
                  <Fade
                    className="text-[#F3F4F6]"
                    delay={1e3}
                    cascade
                    damping={1e-1}
                  >
                    Your Trusted Solution for Effortless Parcel Management
                  </Fade>
                </>
              </h1>
              <button
                className="px-8 py-3 bg-butL dark:bg-butD text-headD dark:text-headL font-raleway text-base font-semibold hover:bg-butD dark:hover:bg-butL rounded-xl"
                onClick={() => scrollToSection("category")}
              >
                View Categories
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="w-full h-[400px]" src={banner4} alt="Banner 3" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, .9))",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-10 ">
              <h1 className="text-center leading-10 text-3xl font-raleway font-medium w-2/3 mx-auto">
                <>
                  <Slide>
                    <h1 className="text-[#F3F4F6]">Welcome to ParcelPro</h1>
                  </Slide>
                  <Fade
                    className="text-[#F3F4F6]"
                    delay={1e3}
                    cascade
                    damping={1e-1}
                  >
                    Your Trusted Solution for Effortless Parcel Management
                  </Fade>
                </>
              </h1>
              <button
                className="px-8 py-3 bg-butL dark:bg-butD text-headD dark:text-headL font-raleway text-base font-semibold hover:bg-butD dark:hover:bg-butL rounded-xl"
                onClick={() => scrollToSection("category")}
              >
                Book Your Parcel
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="w-full h-[400px]" src={banner5} alt="Banner 3" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, .9))",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-10 ">
              <h1 className="text-center leading-10 text-3xl font-raleway font-medium w-2/3 mx-auto">
                <>
                  <Slide>
                    <h1 className="text-[#F3F4F6]">Welcome to CraftyHub</h1>
                  </Slide>
                  <Fade
                    className="text-[#F3F4F6]"
                    delay={1e3}
                    cascade
                    damping={1e-1}
                  >
                    Your Trusted Solution for Effortless Parcel Management
                  </Fade>
                </>
              </h1>
              <button
                className="px-8 py-3 bg-butL dark:bg-butD text-headD dark:text-headL font-raleway text-base font-semibold hover:bg-butD dark:hover:bg-butL rounded-xl"
                onClick={() => scrollToSection("category")}
              >
                View Categories
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
