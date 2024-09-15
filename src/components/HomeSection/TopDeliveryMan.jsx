import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const TopDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: topMan = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["delivery-men"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/delivery-men`);
      return data;
    },
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error loading data: {error.message}
      </p>
    );

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
    <section className="p-6 bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 dark:from-purple-700 dark:via-pink-700 dark:to-red-700">
      <h1 className="text-4xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-10">
        Top Delivery Men
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedDeliveryMen.length > 0 ? (
          sortedDeliveryMen.map((man) => (
            <div
              key={man._id}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 to-blue-500 opacity-20 rounded-lg"></div>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={man.image}
                  alt={man.name}
                  className="w-20 h-20 object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {man.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total Deliveries: {man.deliveryCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-500" />
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {man.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No delivery men data available.
          </p>
        )}
      </div>
    </section>
  );
};

export default TopDeliveryMan;
