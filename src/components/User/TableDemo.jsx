import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export function TableDemo({ booked }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parcel Types</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Approximate Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Delivery Man id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {booked.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.type}</TableCell>
              <TableCell>{data.reqDate}</TableCell>
              <TableCell>{data.Approximatte_Date}</TableCell>
              <TableCell>{data.bookingDate}</TableCell>
              <TableCell>{data.DeliveryMan_id}</TableCell>
              <TableCell>{data.status}</TableCell>
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
