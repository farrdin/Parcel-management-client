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
  const {
    data: deliveryMen = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["/delivery-men"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/delivery-men`);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

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
          {deliveryMen.map((deliveryMan) => (
            <TableRow key={deliveryMan._id}>
              <TableCell>{deliveryMan.name}</TableCell>
              <TableCell>{deliveryMan.phone}</TableCell>
              <TableCell>{deliveryMan.deliveryCount}</TableCell>
              <TableCell>{deliveryMan.averageRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
