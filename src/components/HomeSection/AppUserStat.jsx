import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import Lottie from "lottie-react";
import parcelsBookedAnimation from "../../assets/booked.json";
import parcelsDeliveredAnimation from "../../assets/delivered.json";
import usersOnSiteAnimation from "../../assets/user.json";

const AppUserStat = () => {
  const axiosSecure = useAxiosSecure();
  const { data: numberUsers } = useQuery({
    queryKey: ["numberUsers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/number-users");
      return response.data;
    },
  });
  const { data: numberDelivered } = useQuery({
    queryKey: ["numberDelivered"],
    queryFn: async () => {
      const response = await axiosSecure.get("/number-delivered");
      return response.data;
    },
  });
  const { data: numberParcels } = useQuery({
    queryKey: ["numberParcels"],
    queryFn: async () => {
      const response = await axiosSecure.get("/number-parcels");
      return response.data;
    },
  });
  const [counterActive, setCounterActive] = useState(false);

  return (
    <section className="text-center py-20 bg-gradient-to-r from-butL via-pink-500 to-butD">
      <h1 className="text-4xl font-sans font-semibold mb-3 text-headL dark:text-headD">
        Performance Snapshot
      </h1>
      <p className="mb-12 text-base font-mont font-light text-headL dark:text-headD">
        See the Numbers Behind the Success
      </p>
      <ScrollTrigger
        onEnter={() => setCounterActive(true)}
        onExit={() => setCounterActive(false)}
      >
        <div className="flex flex-col md:flex-row justify-around md:w-[70%] md:mx-auto items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="stat-item bg-backL dark:bg-backD p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex justify-center">
              <Lottie
                animationData={parcelsBookedAnimation}
                className="w-[80px] "
                loop={true}
              />
            </div>

            <p className="text-2xl font-bold text-headL dark:text-headD">
              {counterActive && numberParcels && (
                <CountUp
                  end={numberParcels.totalBookedParcels}
                  duration={2}
                  delay={0.5}
                />
              )}
            </p>
            <h3 className="text-xl font-semibold text-headL dark:text-headD">
              Parcels Booked
            </h3>
          </div>
          <div className="stat-item bg-backL dark:bg-backD p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex justify-center">
              <Lottie
                animationData={parcelsDeliveredAnimation}
                className="w-[80px] "
                loop={true}
              />
            </div>

            <p className="text-2xl font-bold text-headL dark:text-headD">
              {counterActive && numberDelivered && (
                <CountUp
                  end={numberDelivered.deliveredParcels}
                  duration={2}
                  delay={0.5}
                />
              )}
            </p>
            <h3 className="text-xl font-semibold text-headL dark:text-headD">
              Parcels Delivered
            </h3>
          </div>
          <div className="stat-item bg-backL dark:bg-backD p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex justify-center">
              <Lottie
                animationData={usersOnSiteAnimation}
                className="w-[80px] "
                loop={true}
              />
            </div>

            <p className="text-2xl font-bold text-headL dark:text-headD">
              {counterActive && numberUsers && (
                <CountUp
                  end={numberUsers.totalUsers}
                  duration={2}
                  delay={0.5}
                />
              )}
            </p>
            <h3 className="text-xl font-semibold text-headL dark:text-headD">
              Users On Site
            </h3>
          </div>
        </div>
      </ScrollTrigger>
    </section>
  );
};

export default AppUserStat;
