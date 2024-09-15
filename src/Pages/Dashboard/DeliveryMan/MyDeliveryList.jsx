import { TableDeliveryList } from "@/components/Dashboard/DeliveryMan/TableDeliveryList";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: assigned = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/parcels-assigned"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels-assigned`);
      return data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>ParcelPro | Delivery-List</title>
      </Helmet>
      <TableDeliveryList
        assigned={assigned}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default MyDeliveryList;
