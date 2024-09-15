import { TableUser } from "@/components/Dashboard/User/TableUser";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/parcels", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>ParcelPro | My-Parcels</title>
      </Helmet>
      <TableUser parcels={parcels} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default MyParcel;
