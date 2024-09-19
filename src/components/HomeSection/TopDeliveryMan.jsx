import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";
import Spinner from "../shared/Spinner";
import back from "../../assets/back.jpeg";

const TopDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const { data: topMan = [], isLoading } = useQuery({
    queryKey: ["delivery-men"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/delivery-men`);
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  const sortedDeliveryMen = (Array.isArray(topMan) ? topMan : [])
    .slice()
    .sort((a, b) => {
      if (b.deliveryCount !== a.deliveryCount) {
        return b.deliveryCount - a.deliveryCount;
      }
      return b.averageRating - a.averageRating;
    })
    .slice(0, 3);

  return (
    <section
      className="bg-fixed bg-cover bg-center space-y-10 px-6 py-10 "
      style={{
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${back})`,
      }}
    >
      <div className="w-[80%] mx-auto">
        <h1 className="text-4xl font-semibold text-center text-headD mb-10">
          Top Delivery Experts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-32">
          {sortedDeliveryMen.length > 0 ? (
            sortedDeliveryMen.map((man) => (
              <div
                key={man._id}
                className="group relative overflow-hidden shadow-lg shadow-butD w-full cursor-pointer"
              >
                <img
                  src={man.image}
                  alt={man.name}
                  className="h-[300px] w-full object-cover"
                />
                <div className="absolute -bottom-10 opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-1000 text-center bg-backL text-headL font-open w-full h-[140px] p-5">
                  <h2 className="text-lg font-semibold text-headL">
                    {man.name}
                  </h2>
                  <p className="text-headL text-sm font-thin ">
                    Total Deliveries: {man.deliveryCount}
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <FaStar className="text-yellow-500" />
                    <span className="text-2xl font-bold text-headL">
                      {man.averageRating.toFixed()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-headL">
              No delivery men data available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopDeliveryMan;
