import { Helmet } from "react-helmet-async";
import { TableUsers } from "@/components/Dashboard/Admin/TableUsers";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  // *? Get All user list form DB
  const {
    data: AllUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>ParcelPro | All-User</title>
      </Helmet>
      <TableUsers AllUsers={AllUsers} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default AllUsers;
