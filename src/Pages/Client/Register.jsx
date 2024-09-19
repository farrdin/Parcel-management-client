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
import { imageUpload } from "@/components/shared/image";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, user, updateUser, setLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axios = useAxiosCommon();

  const onSubmit = async (data) => {
    const imgFile = data.image[0];
    const image = await imageUpload(imgFile);
    const name = data.name;
    const email = data.email.toLowerCase();
    const password = data.password;
    const phone = data.phone;
    const requested = data.requested;

    try {
      const result = await createUser(email, password);
      if (result.user) {
        const userDetail = {
          email,
          name,
          image,
          phone,
          requested,
          role: "user",
        };
        await axios.put("/users", userDetail);
        await updateUser(name, image);
        Swal.fire({
          title: "Congratulations!",
          text: "Your Account Created Successfully!",
          icon: "success",
          iconColor: "#2ecc71",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#2ecc71",
        });

        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message, { theme: "colored" });
    } finally {
      setLoading(false);
    }
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
                      pattern: {
                        value: /^\+?[0-9]\d{10,10}$/,
                        message: "Phone number must only contain digits",
                      },
                    })}
                    type="tel"
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
                      <option defaultValue="User" value="user">
                        User
                      </option>
                      <option value="deliveryMan">Delivery Man</option>
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
                className=" bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL w-full px-8 py-3 font-semibold rounded-md font-open"
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
