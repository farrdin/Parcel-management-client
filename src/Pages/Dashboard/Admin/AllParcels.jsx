import { TableParcels } from "@/components/Dashboard/Admin/TableParcels";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: AllParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/parcels"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels`);
      return data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>ParcelPro | All-Parcels</title>
      </Helmet>
      <TableParcels
        AllParcels={AllParcels}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default AllParcels;
