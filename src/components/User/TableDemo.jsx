import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "../../../public/data.json";
import { Button } from "../ui/button";

export function TableDemo() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parcel Types</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Approximatte Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Delivery Man id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.Parcel_Types}</TableCell>
              <TableCell>{data.Requested_Date}</TableCell>
              <TableCell>{data.Approximatte_Date}</TableCell>
              <TableCell>{data.BOOKING_Date}</TableCell>
              <TableCell>{data.DeliveryMan_id}</TableCell>
              <TableCell>{data.Status}</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>
                <Button>Actions</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
