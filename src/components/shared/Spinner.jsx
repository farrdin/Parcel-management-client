import { SyncLoader } from "react-spinners";

const Spinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex
      justify-center
      items-center
      mx-auto `}
    >
      <SyncLoader size={10} color="#FFB8B8" speedMultiplier="0.8" />
    </div>
  );
};

export default Spinner;
