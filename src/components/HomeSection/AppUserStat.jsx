import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

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
      <h1 className="text-4xl font-sans font-semibold mb-12 text-white">
        User Insights & Stats
      </h1>
      <ScrollTrigger
        onEnter={() => setCounterActive(true)}
        onExit={() => setCounterActive(false)}
      >
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="stat-item bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800">
              Parcels Booked
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {counterActive && numberParcels && (
                <CountUp
                  end={numberParcels.totalBookedParcels}
                  duration={2}
                  delay={0.5}
                />
              )}
            </p>
          </div>
          <div className="stat-item bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800">
              Parcels Delivered
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {counterActive && numberDelivered && (
                <CountUp
                  end={numberDelivered.deliveredParcels}
                  duration={2}
                  delay={0.5}
                />
              )}
            </p>
          </div>
          <div className="stat-item bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800">
              Users On Site
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {counterActive && numberUsers && (
                <CountUp
                  end={numberUsers.totalUsers}
                  duration={2}
                  delay={0.5}
                />
              )}
            </p>
          </div>
        </div>
      </ScrollTrigger>
    </section>
  );
};

export default AppUserStat;
