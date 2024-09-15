import { TableDeliveryMan } from "@/components/Dashboard/Admin/TableDeliveryMan";
import { Helmet } from "react-helmet-async";

const AllDeliveryMan = () => {
  return (
    <div>
      <Helmet>
        <title>ParcelPro | All-DeliveryMan</title>
      </Helmet>
      <TableDeliveryMan />
    </div>
  );
};

export default AllDeliveryMan;
