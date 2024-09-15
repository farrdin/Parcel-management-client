import useAuth from "@/Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ReactStarsRating from "react-awesome-stars-rating";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ReviewModal = ({ closeReview, review }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const { register, handleSubmit } = useForm();

  const { data: assignMan } = useQuery({
    queryKey: [`/users/${review.assigned}`],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${review.assigned}`);
      return data;
    },
    enabled: !!review.assigned,
  });
  const today = new Date().toISOString().split("T")[0];
  const onSubmit = async (data) => {
    const name = user.displayName;
    const deliverMan = assignMan.name;
    const description = data.description;
    const review = {
      name,
      deliverMan,
      description,
      rating,
      today,
    };
    closeReview();
    console.log(review);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <img src={user.photoURL} className="h-32 w-32 rounded-full " />
        </div>
        <div className="md:flex gap-2">
          <div className="space-y-2 md:w-1/2">
            <label className="block text-sm text-headL dark:text-headD">
              Your Name
            </label>
            <input
              {...register("username")}
              defaultValue={user.displayName}
              disabled
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
            />
          </div>
          <div className="space-y-2 md:w-1/2">
            <label className="block text-sm text-headL dark:text-headD">
              Delivery Man Name
            </label>
            <input
              {...register("deliveryMan")}
              value={assignMan.name}
              disabled
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-headL dark:text-headD">
            Feedback
          </label>
          <textarea
            {...register("feedback")}
            className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
          />
        </div>
        <div>
          <ReactStarsRating
            isHalf={true}
            isEdit={true}
            size="25"
            primaryColor="gold"
            secondaryColor="gray"
            className="flex"
            value={rating}
            onChange={(newRating) => setRating(newRating)}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Rate your experience from 1 to 5 stars.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL px-8 py-3 font-semibold rounded-md">
          Give Review
        </button>
      </div>
    </form>
  );
};

export default ReviewModal;
