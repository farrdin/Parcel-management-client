import { TableDemo } from "@/components/User/TableDemo";
import { Helmet } from "react-helmet-async";

const MyParcel = () => {
  return (
    <div>
      <Helmet>
        <title>ParcelPro | My-Parcels</title>
      </Helmet>
      <TableDemo />
    </div>
  );
};

export default MyParcel;
