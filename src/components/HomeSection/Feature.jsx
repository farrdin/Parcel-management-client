import { CiDeliveryTruck } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineElectricBolt } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";

const Feature = () => {
  return (
    <div className="text-headL dark:text-headD font-open">
      <section>
        <div className="container mx-auto text-center">
          {/* Title */}
          <h1 className="text-4xl text-center text-headL dark:text-headD font-sans font-semibold mb-4 animate__animated animate__fadeIn">
            Our Features
          </h1>
          <p className="text-sm font-light mb-8 animate__animated animate__fadeIn animate__delay-1s">
            With professional movers, we provide the following services at
            affordable rates, to suit your pocket and soothe your mind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 shadow-md shadow-butD bg-backL dark:bg-backD rounded-lg card-hover">
              <CiDeliveryTruck className="text-5xl text-center w-full text-butD mb-7 icon-hover" />
              <h3 className="text-xl font-medium mb-2">Parcel Safety</h3>
              <p className="text-sm font-thin">
                Your parcels are secure with us, thanks to our advanced tracking
                system.
              </p>
            </div>
            <div className="p-6 shadow-md shadow-butD bg-backL dark:bg-backD rounded-lg card-hover">
              <GiPathDistance className="text-5xl text-center w-full text-butL mb-7 icon-hover" />
              <h3 className="text-xl font-medium mb-2">Long Distance Moving</h3>
              <p className="text-sm font-thin">
                Mover will make your long distance moving experience
                stress-free.
              </p>
            </div>
            <div className="p-6 shadow-md shadow-butD bg-backL dark:bg-backD rounded-lg card-hover">
              <MdOutlineElectricBolt className="text-5xl text-center w-full text-yellow-300 mb-7 icon-hover" />
              <h3 className="text-xl font-medium mb-2">Super Fast Delivery</h3>
              <p className="text-sm font-thin">
                Get your parcels delivered swiftly with our efficient delivery
                system.
              </p>
            </div>
            <div className="p-6 shadow-md shadow-butD bg-backL dark:bg-backD rounded-lg card-hover">
              <BiSupport className="text-5xl text-center w-full mb-7 icon-hover" />
              <h3 className="text-xl font-medium mb-2">
                24/7 Customer Support
              </h3>
              <p className="text-sm font-thin">
                Our support team is available around the clock to assist you.
              </p>
            </div>
            <div className="p-6 shadow-md shadow-butD bg-backL dark:bg-backD rounded-lg card-hover">
              <FaBoxOpen className="text-5xl text-center w-full text-amber-800 mb-7 icon-hover" />
              <h3 className="text-xl font-medium mb-2">Box Delivery</h3>
              <p className="text-sm font-thin">
                We have all the packing supplies, including boxes, packing tape,
                and bubble wrap.
              </p>
            </div>
            <div className="p-6 shadow-md shadow-butD bg-backL dark:bg-backD rounded-lg card-hover">
              <AiFillSetting className="text-5xl text-center w-full mb-7 icon-hover" />
              <h3 className="text-xl font-medium mb-2">Loading / Unloading</h3>
              <p className="text-sm font-thin">
                We allow our customers to rent the moving truck, and well load
                and unload.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
