import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import SelectDeliveryMan from "./Modal/SelectDeliveryMan";

export function TableParcels({ AllParcels, isLoading, refetch }) {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [updateOpen, setupdateOpen] = useState(false);

  const openUpdate = (parcel) => {
    setSelectedParcel(parcel);
    setupdateOpen(true);
  };
  const closeUpdate = () => {
    setupdateOpen(false);
    setSelectedParcel(null);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllParcels.map((data) => (
            <TableRow key={data._id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.phone}</TableCell>
              <TableCell>{data.bookingDate}</TableCell>
              <TableCell>{data.reqDate}</TableCell>
              <TableCell>{data.price}tk</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                <Button
                  className="bg-butL dark:bg-butD hover:bg-butD hover:dark:bg-butL text-paraD dark:text-headL hover:dark:text-paraD hover:text-headL   font-semibold text-xs"
                  onClick={() => openUpdate(data)}
                  disabled={
                    data?.status === "Cancelled" || data?.status === "Delivered"
                  }
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* //? Dialogue For Update  */}
      <Dialog open={updateOpen} onOpenChange={setupdateOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          style={{
            width: "100vw",
            maxWidth: "400px",
          }}
        >
          <DialogTitle>Select DeliveryMan & Approximate Date :</DialogTitle>
          {selectedParcel && (
            <SelectDeliveryMan
              isLoading={isLoading}
              refetch={refetch}
              parcel={selectedParcel}
              closeUpdate={closeUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
