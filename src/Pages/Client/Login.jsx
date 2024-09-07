import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import login from "../../assets/1.json";
import useAuth from "@/Hooks/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logIn, googleLogin, githubLogin, setLoading, resetPassword } =
    useAuth();
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");

  const handleLogin = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      setLoading(true);
      await logIn(email, password);
      Swal.fire({
        title: "Congratulations!",
        text: "Signed In  Successfully!",
        icon: "success",
        timer: 2000,
      });
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password", { theme: "colored" });
      setLoading(false);
    }
  };
  const handleResetPassword = async () => {
    if (!email) return toast.error("Please write your email first!");
    try {
      await resetPassword(email);
      toast.success("Request Success! Check your email for further process...");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          title: "Congratulations!",
          text: "Google Signed In  Successfully with!",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGitHubLogin = () => {
    githubLogin()
      .then(() => {
        Swal.fire({
          title: "Congratulations!",
          text: "Github Signed In  Successfully with!",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      <Helmet>
        <title>ParcelPro | Log In</title>
      </Helmet>
      <div className="md:flex md:gap-20 lg:gap-0 justify-end lg:justify-around p-5">
        <Lottie animationData={login} className="w-full md:w-[40%]" />
        <div className="w-full md:w-[60%] lg:w-[40%]">
          <div className="p-4 rounded-md shadow bg-backL dark:bg-backD text-headL dark:text-paraD font-mont h-full lg:w-[80%]">
            <p className="text-sm text-center">
              Dont have account?
              <Link to="/register" className="hover:underline text-link ">
                Sign up here
              </Link>
            </p>
            <div className="my-6 space-y-4">
              <button
                aria-label="Login with Google"
                onClick={handleGoogleLogin}
                type="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600  bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL  "
              >
                <FaGoogle className="text-2xl dark:text-link text-white" />
                <p>Login with Google</p>
              </button>
              <button
                onClick={handleGitHubLogin}
                aria-label="Login with GitHub"
                role="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600  bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL"
              >
                <FaGithub className="text-2xl dark:text-purple-600 text-white" />
                <p>Login with GitHub</p>
              </button>
            </div>
            <div className="flex items-center w-full my-4">
              <hr className="w-full dark:text-gray-600" />
              <p className="px-3 text-sm text-headL dark:text-headD font-open font-light">
                OR
              </p>
              <hr className="w-full dark:text-gray-600" />
            </div>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm text-headL dark:text-headD">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    onBlur={(e) => setEmail(e.target.value)}
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
                    required
                    {...register("password")}
                    type="password"
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link"
                  />
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline text-link items-end justify-end flex"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <button className="btn bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL w-full px-8 py-3 font-semibold rounded-md font-open">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
