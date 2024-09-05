import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 dark:bg-gray-800 p-5 text-gray-700 dark:text-gray-300 ">
        <div className="md:flex justify-between w-[70%] mx-auto space-y-5 md:space-y-0">
          <nav>
            <h6 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Services
            </h6>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Shipping & Returns
            </a>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Terms of Service
            </a>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Site Map
            </a>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Company
            </h6>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              About us
            </a>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Contact
            </a>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Email Us
            </a>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Legal
            </h6>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Terms of use
            </a>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Privacy policy
            </a>
            <a className="block mb-2 hover:text-blue-500 dark:hover:text-blue-400">
              Cookie policy
            </a>
          </nav>
        </div>
      </footer>
      <footer className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-t border-gray-300 dark:border-gray-600 px-10 py-4 ">
        <div className="md:flex items-center justify-between space-y-5">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CraftyHub Logo" className="h-10" />
            <div className="ml-3">
              <span className="text-2xl font-bold">ParcelPro</span>
              <p className="text-xs font-medium">
                Your Ultimate Shipping Solution
              </p>
            </div>
          </Link>
          <div className="flex gap-4">
            <Link to="#">
              <FaYoutube
                data-tooltip-id="tooltip"
                data-tooltip-content="Subscribe us"
                className="text-xl text-butL dark:text-butD  bg-base-300 box-content px-3 py-3 rounded-full shadow-lg shadow-butD/30 hover:shadow-inner hover:shadow-butD/30 duration-300 cursor-pointer  hover:text-[red] "
              />
            </Link>
            <Link to="#">
              <FaXTwitter
                data-tooltip-id="tooltip"
                data-tooltip-content="Join us"
                className="text-xl text-butL dark:text-butD bg-base-300 box-content px-3 py-3 rounded-full shadow-lg shadow-butD/30 hover:shadow-inner hover:shadow-butD/30 duration-300 cursor-pointer hover:text-blue-600 hover:text-secondary hover:dark:text-secondary"
              />
            </Link>
            <Link to="#">
              <FaFacebookF
                data-tooltip-id="tooltip"
                data-tooltip-content="Follow us"
                className="text-xl text-butL dark:text-butD bg-base-300 box-content px-3 py-3 rounded-full shadow-lg shadow-butD/30 hover:shadow-inner hover:shadow-butD/30 duration-300 cursor-pointer hover:text-blue-600 hover:dark:text-[blue]"
              />
            </Link>
          </div>
        </div>
      </footer>
      <Tooltip id="tooltip" />
    </div>
  );
};

export default Footer;
