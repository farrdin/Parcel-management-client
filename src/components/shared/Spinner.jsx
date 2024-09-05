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
      <SyncLoader size={10} color="red" />
    </div>
  );
};

export default Spinner;
