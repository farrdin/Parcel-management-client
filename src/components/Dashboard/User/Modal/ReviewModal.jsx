import useAuth from "@/Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ReactStarsRating from "react-awesome-stars-rating";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ReviewModal = ({ closeReview, review }) => {
  const axiosSecure = useAxiosSecure();
  const { user, setLoading } = useAuth();
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [reviewPosted, setReviewPosted] = useState(false);
  const { register, handleSubmit } = useForm();

  const { data: assignMan } = useQuery({
    queryKey: [`/users/${review.assigned}`],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${review.assigned}`);
      return data;
    },
    enabled: !!review.assigned,
  });
  useEffect(() => {
    console.log("Review:", review);
  }, [review]);

  const { mutateAsync: mutateAsyncOne } = useMutation({
    mutationFn: async (reviews) => {
      const { data } = await axiosSecure.post(`/reviews`, reviews);
      return data;
    },
    onSuccess: () => {
      toast.success("Feedback posted Successfully!");
      setLoading(false);
      setReviewPosted(true);
    },
  });
  const { mutateAsync: mutateAsyncTwo } = useMutation({
    mutationFn: async (reviewd) => {
      const { data } = await axiosSecure.patch(
        `/parcels/update/${review?._id}`,
        reviewd
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Reviewd Successfully!");
    },
  });
  const today = new Date().toISOString().split("T")[0];
  const onSubmit = async (data) => {
    const name = user.displayName;
    const photo = user.photoURL;
    const deliverId = assignMan._id;
    const delivername = assignMan.name;
    const deliverMail = assignMan.email;
    const description = data.feedback;
    if (rating === 0) {
      setRatingError(true);
      return;
    } else {
      setRatingError(false);
    }
    try {
      const reviews = {
        name,
        photo,
        deliverId,
        delivername,
        deliverMail,
        description,
        rating,
        today,
      };
      await mutateAsyncOne(reviews);
      closeReview();
      const reviewd = {
        review: "Reviewd",
      };
      await mutateAsyncTwo(reviewd);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
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
              required
              defaultValue={user.displayName || ""}
              disabled={!"" || !null}
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
              required
              defaultValue={assignMan?.name || ""}
              disabled={!"" || !null}
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
            required
            {...register("feedback")}
            className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
          />
        </div>
        <div>
          <ReactStarsRating
            required
            isHalf={true}
            isEdit={true}
            size="25"
            primaryColor="gold"
            secondaryColor="gray"
            className="flex"
            value={rating}
            onChange={(newRating) => setRating(newRating)}
          />
          {ratingError && (
            <p className="text-sm text-red-500 mt-2">Rating is required</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Rate your experience from 1 to 5 stars.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          disabled={reviewPosted}
          className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL px-2 py-2 font-semibold rounded-md"
        >
          Give Review
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            closeReview();
          }}
          className="bg-headD dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraL dark:text-headL hover:dark:text-paraD hover:text-headL px-6 py-2 font-semibold rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewModal;
