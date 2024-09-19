import useAuth from "@/Hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "@/components/shared/image";
import { useForm } from "react-hook-form";

const UpdateForm = () => {
  const { user, updateUser, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.displayName,
      email: user.email,
    },
  });
  const onSubmit = async (data) => {
    const imgFile = data.image[0];
    const currentName = user?.displayName;
    const currentImage = user?.photoURL;
    const name = data.name;
    let isChanged = false;
    const upDetail = { email: user?.email };
    setLoading(true);

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update your profile?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel",
        iconColor: "#FF5757",
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#FF5757",
      });
      if (result.isConfirmed) {
        if (name && name !== currentName) {
          upDetail.name = name;
          isChanged = true;
        }
        if (imgFile) {
          const image = await imageUpload(imgFile);
          if (!image) {
            throw new Error("Image upload failed");
          }
          if (image !== currentImage) {
            upDetail.image = image;
            isChanged = true;
          }
        }
        if (isChanged) {
          await updateUser(
            upDetail.name || currentName,
            upDetail.image || currentImage
          );
          const response = await axiosSecure.put("/users", upDetail);
          if (response.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Profile updated successfully.",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            });
          } else {
            throw new Error("Failed to update profile on the server.");
          }
        } else {
          Swal.fire({
            title: "No changes detected",
            text: "Your profile is already up to date.",
            icon: "info",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Profile update has been cancelled.",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "An error occurred", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-headL dark:text-headD">
            Email address
          </label>
          <input
            {...register("email")}
            disabled
            type="email"
            className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-headL dark:text-headD">
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
          />
        </div>
        <div>
          <label className="block text-sm text-headL dark:text-headD">
            Photo Url
          </label>
          <input {...register("image")} type="file" placeholder="URL" />
        </div>
      </div>
      <button className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL w-full px-8 py-3 font-semibold rounded-md">
        Update Profile
      </button>
    </form>
  );
};

export default UpdateForm;
