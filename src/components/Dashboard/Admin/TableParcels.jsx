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
import { useState, useEffect } from "react";
import SelectDeliveryMan from "./Modal/SelectDeliveryMan";

export function TableParcels({ AllParcels, isLoading, refetch }) {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [updateOpen, setupdateOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(AllParcels);

  const openUpdate = (parcel) => {
    setSelectedParcel(parcel);
    setupdateOpen(true);
  };
  const closeUpdate = () => {
    setupdateOpen(false);
    setSelectedParcel(null);
  };

  const handleFilter = () => {
    if (dateFrom && dateTo) {
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      setFilteredParcels(
        AllParcels.filter((parcel) => {
          const reqDate = new Date(parcel.reqDate);
          return reqDate >= startDate && reqDate <= endDate;
        })
      );
    } else {
      setFilteredParcels(AllParcels);
    }
  };
  useEffect(() => {
    handleFilter();
  }, [dateFrom, dateTo, AllParcels]);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link text-xs"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="px-3 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link text-xs"
        />
        <Button
          className="bg-butL hover:bg-butD hover:dark:bg-butL dark:bg-butD text-white"
          onClick={handleFilter}
        >
          Filter
        </Button>
        <Button
          className="bg-gray-500 text-white"
          onClick={() => {
            setDateFrom("");
            setDateTo("");
            setFilteredParcels(AllParcels);
          }}
        >
          Clear Filter
        </Button>
      </div>

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
          {filteredParcels.map((data) => (
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
                    data?.status === "Cancelled" ||
                    data?.status === "On the way" ||
                    data?.status === "Delivered"
                  }
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* //? Dialog For Update */}
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
