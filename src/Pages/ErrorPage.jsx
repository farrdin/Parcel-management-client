import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Error from "../assets/404.json";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="p-5 md:flex justify-center items-center bg-red-400 min-h-screen gap-10">
        <Lottie
          loop={true}
          animationData={Error}
          className="w-full md:w-[40%]"
        />
        <div className="flex flex-col items-center text-center">
          <p className="p-3 text-sm font-medium text-rose-500 rounded-full bg-blue-50 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            Something Went Wrong!
          </h1>
          <p className="mt-4 text-gray-500 ">Here are some helpful links:</p>
          <div className="flex items-center justify-center gap-5 mt-5">
            <Button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-300 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180 text-rose-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </Button>
            <Button
              className="p-4 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-300 "
              onClick={() => navigate("/")}
            >
              Take Me Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
