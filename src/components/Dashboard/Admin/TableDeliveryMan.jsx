import {} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export function TableDeliveryMan() {
  const axiosSecure = useAxiosSecure();
  // *?get Users  from DB
  const { data: AllUsers = [] } = useQuery({
    queryKey: ["/users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>DeliveryMan Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Total Delivered</TableHead>
            <TableHead>Average Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllUsers.filter((user) => user.role === "deliveryMan").map(
            (users) => {
              return (
                <TableRow key={users._id}>
                  <TableCell>{users.name}</TableCell>
                  <TableCell>{users.phone}</TableCell>
                  <TableCell>{users.deliveryCount}</TableCell>
                  <TableCell>{users.reviews}</TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
}
