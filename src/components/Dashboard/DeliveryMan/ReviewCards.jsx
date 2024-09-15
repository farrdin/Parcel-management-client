import Spinner from "@/components/shared/Spinner";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ReviewCards = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`/reviews/${user.email}`],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${user.email}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Reviews fetched successfully!");
    },
    onError: (error) => {
      toast.error(`Error fetching reviews: ${error.message}`);
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 bg-backL text-headL dark:bg-backD dark:text-headD font-mont shadow-lg shadow-headL"
          >
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div>
                  <img
                    src={review.photo}
                    alt={review.name || "User"}
                    className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{review.name || "Anonymous"}</h4>
                  <span className="text-xs dark:text-gray-600">
                    {review.today || "Unknown date"}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-yellow-500"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">
                  {review.rating || "N/A"}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm font-light text-paraL dark:text-paraD">
              <p>{review.description || "No description provided."}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewCards;
