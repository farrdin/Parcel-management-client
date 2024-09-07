import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
//
const Footer = () => {
  return (
    <div>
      <footer className="bg-backL dark:bg-backD p-5 text-headL dark:text-headD font-open font-thin">
        <div className="md:flex justify-between w-[70%] mx-auto space-y-5 md:space-y-0">
          <nav>
            <h6 className="text-lg font-semibold text-headL dark:text-headD mb-3">
              Services
            </h6>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Shipping & Returns
            </a>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Terms of Service
            </a>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Site Map
            </a>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold text-headL dark:text-headD mb-3">
              Company
            </h6>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              About us
            </a>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Contact
            </a>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Email Us
            </a>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold text-headL dark:text-headD mb-3">
              Legal
            </h6>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Terms of use
            </a>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Privacy policy
            </a>
            <a className="block mb-2 text-sm hover:text-link dark:hover:text-link">
              Cookie policy
            </a>
          </nav>
        </div>
      </footer>
      <footer className="bg-backL dark:bg-backD p-5 text-headL dark:text-headD border-t px-10 py-4 ">
        <div className="md:flex items-center justify-between space-y-5">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="CraftyHub Logo" className="h-10" />
            <div className="ml-3">
              <span className="text-2xl font-medium">
                Parcel
                <span className="text-base text-butL">Pro</span>
              </span>
              <p className="text-xs font-base text-headL dark:text-headD">
                Your Ultimate Shipping Solution
              </p>
            </div>
          </Link>
          <div className="flex gap-4">
            <Link to="#">
              <FaYoutube
                data-tooltip-id="tooltip"
                data-tooltip-content="Subscribe us"
                className="text-xl text-butL dark:text-butD  bg-base-300 box-content px-3 py-3 rounded-full shadow-lg shadow-butD/30 hover:shadow-inner hover:shadow-butD/30 duration-300 cursor-pointer  hover:text-[red] dark:hover:text-[red]"
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
