import {} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectRole } from "./Modal/SelectRole";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export function TableUsers({ AllUsers, refetch }) {
  const axiosSecure = useAxiosSecure();
  // *?get Parcels list by email from DB
  const { data: AllParcels = [] } = useQuery({
    queryKey: ["/parcels"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels`);
      return data;
    },
  });
  const filterParcels = (email) => {
    return AllParcels.filter((parcel) => parcel.email === email);
  };
  const calculatePrice = (parcels) => {
    return parcels.reduce((sum, parcel) => {
      return sum + (parcel.price ? Number(parcel.price) : 0);
    }, 0);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Total Parcels</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Modify Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllUsers.map((users) => {
            const userParcels = filterParcels(users.email);
            const totalParcels = userParcels.length;
            const totalSpent = calculatePrice(userParcels);
            return (
              <TableRow key={users._id}>
                <TableCell>{users.name}</TableCell>
                <TableCell>{users.phone}</TableCell>
                <TableCell>{totalParcels}</TableCell>
                <TableCell>{`${totalSpent}TK`}</TableCell>
                <TableCell className="flex">
                  <SelectRole users={users} refetch={refetch} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
