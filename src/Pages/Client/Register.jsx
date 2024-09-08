import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import reg from "../../assets/login.json";
import useAuth from "@/Hooks/useAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosCommon from "@/Hooks/useAxiosCommon";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, user, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axios = useAxiosCommon();

  const onSubmit = async (data) => {
    // *? Upload image to imgbb and then get an url
    const image_upload = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_KEY
    }`;
    const imgFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imgFile);
    const imgGet = await axios.post(image_upload, formData);
    const email = data.email;
    const password = data.password;
    const userDetail = {
      email: email,
      name: data.name,
      image: imgGet.data.data.display_url,
      phone: data.phone,
      role: "user",
      requested: data.requested,
    };
    createUser(email, password)
      .then(async (result) => {
        if (result.user) {
          try {
            const userRes = await axios.put("users", userDetail);
            if (userRes.status === 200) {
              Swal.fire({
                title: "Congratulations!",
                text: "Your Account Created Successfully!",
                icon: "success",
                timer: 2000,
              });

              setTimeout(() => {
                navigate(location?.state ? location.state : "/");
              }, 1500);
            }
          } catch (axiosError) {
            console.error("Axios error:", axiosError);
          }
          updateUser(data.name, imgGet.data.data.display_url);
        }
      })
      .catch((error) => {
        toast.error(error.message, { theme: "colored" });
      });
  };
  // **Logged in user can not enter on this page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      <Helmet>
        <title>ParcelPro | Register Now</title>
      </Helmet>

      <div className="md:flex md:gap-20 lg:gap-0 justify-end lg:justify-around p-5">
        <Lottie
          className="w-full md:w-[50%] lg:w-[40%]"
          loop={true}
          animationData={reg}
        />

        <div className="w-full md:w-[50%] lg:w-[40%]">
          <div className="h-full p-4 rounded-md shadow sm:p-8 bg-backL dark:bg-backD text-headL dark:text-paraD font-mont ">
            <p className="text-sm text-center text-headL dark:text-headD mb-10">
              Already have account?
              <Link
                to="/login"
                className="hover:underline text-link dark:text-link"
              >
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm text-headL dark:text-headD">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    required
                    type="text"
                    placeholder="Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-headL dark:text-headD">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    required
                    type="email"
                    placeholder="****@email.com"
                    className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm ext-headL dark:text-headD"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
                        message:
                          "Password must include uppercase, lowercase, and a special character",
                      },
                    })}
                    type="password"
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                  />
                  {errors.password && (
                    <span className="text-sm text-link">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm ext-headL dark:text-headD"
                  >
                    Phone Number
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone Number is required",
                      maxLength: {
                        value: 11,
                        message: "Enter a valid Number",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Phone number must only contain digits",
                      },
                    })}
                    type="text"
                    placeholder="Enter a Phone Number"
                    className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                  />
                  {errors.phone && (
                    <span className="text-sm text-link">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div className="lg:flex items-center gap-10 my-2 space-y-4 lg:space-y-0">
                  <div>
                    <label className="block text-sm text-headL dark:text-headD">
                      Choose Account:
                    </label>
                    <select
                      {...register("requested")}
                      required
                      className="px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                    >
                      <option defaultValue="User" value="User">
                        User
                      </option>
                      <option value="DeliveryMan">Delivery Man</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-headL dark:text-headD">
                      Photo Url
                    </label>
                    <input
                      required
                      {...register("image")}
                      type="file"
                      placeholder="URL"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL w-full px-8 py-3 font-semibold rounded-md font-open"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
