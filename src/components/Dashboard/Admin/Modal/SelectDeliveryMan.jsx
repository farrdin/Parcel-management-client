import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";

const SelectDeliveryMan = ({ parcel, refetch, closeUpdate }) => {
  const { setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const today = new Date().toISOString().split("T")[0];

  // *?get Users  from DB
  const { data: AllUsers = [] } = useQuery({
    queryKey: ["/users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });
  // *? Update Selected parcel with assign details
  const { mutateAsync } = useMutation({
    mutationFn: async (assign) => {
      const { data } = await axiosSecure.patch(
        `/parcels/update/${parcel?._id}`,
        assign
      );
      return data;
    },
    onSuccess: () => {
      toast.success("DeliveryMan Assigned Successfully!");
      closeUpdate();
    },
  });
  const onSubmit = async (data) => {
    try {
      const assign = {
        ...data,
        status: "On the way",
      };
      await mutateAsync(assign);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2 ">
          <label className="block text-sm text-headL dark:text-headD">
            Approximate Delivery Date
          </label>
          <input
            {...register("approxDate")}
            required
            min={today}
            type="date"
            className="w-full px-3 py-1 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-headL dark:text-headD">
            Select Delivery Man
          </label>
          <select
            {...register("assigned", { required: true })}
            className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
          >
            <option value="">Select Delivery Man</option>
            {AllUsers.filter((user) => user.role === "deliveryMan").map(
              (man) => (
                <option key={man._id} value={man.email}>
                  {man.name}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <button className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL w-full px-8 py-3 font-semibold rounded-md">
        Assign
      </button>
    </form>
  );
};

export default SelectDeliveryMan;
