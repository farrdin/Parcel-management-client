import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
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
    <section className="p-6 bg-white text-center">
      <h1 className="text-4xl text-center text-headL dark:text-headD font-sans font-semibold mb-6">
        Top Delivery Men
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedDeliveryMen.length > 0 ? (
          sortedDeliveryMen.map((man) => (
            <div
              key={man._id}
              className="delivery-man-card p-6 bg-gray-100 rounded-lg shadow-lg"
            >
              <img
                src={man.image}
                alt={man.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{man.name}</h3>
              <p className="text-lg mb-1">
                Parcels Delivered: {man.deliveryCount}
              </p>
              <p className="text-lg">
                Average Rating: {man.averageRating.toFixed(1)}
              </p>
            </div>
          ))
        ) : (
          <p>No delivery men data available.</p>
        )}
      </div>
    </section>
  );
};

export default TopDeliveryMan;
