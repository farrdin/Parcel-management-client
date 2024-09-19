import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ViewMap from "./Modal/ViewMap";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export function TableDeliveryList({ assigned, isLoading, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [mapOpen, setmapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const openMap = (data) => {
    setSelectedLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    });
    setmapOpen(true);
  };
  const closeMap = () => setmapOpen(false);

  const { mutateAsync: deliverParcel } = useMutation({
    mutationFn: async ({ id, delivered }) => {
      try {
        const { data } = await axiosSecure.patch(
          `/parcels/update/${id}`,
          delivered
        );
        return data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to update parcel"
        );
      }
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleDeliverParcel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm the delivery of this parcel?",
      icon: "warning",
      iconColor: "#FF5757",
      showCancelButton: true,
      confirmButtonText: "Yes, deliver it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#2ecc71",
      cancelButtonColor: "#FF5757",
    });
    if (!result.isConfirmed) {
      Swal.fire({
        title: "Cancelled",
        text: "Parcel delivery has been cancelled.",
        icon: "info",
        iconColor: "#FF5757",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#2ecc71",
      });
      return;
    }
    try {
      const delivered = {
        status: "Delivered",
      };
      await deliverParcel({ id, delivered });
      Swal.fire({
        title: "Success!",
        text: "Parcel delivered successfully.",
        icon: "success",
        iconColor: "#2ecc71",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#2ecc71",
      });
    } catch (err) {
      console.error("Error in handleDeliverParcel:", err.message || err);
      Swal.fire({
        title: "Error",
        text: "Failed to deliver the parcel.",
        icon: "error",
        iconColor: "#FF5757",
        confirmButtonColor: "#2ecc71",
      });
    }
  };

  const cancelParcel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this parcel?",
      icon: "warning",
      iconColor: "#FF5757",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#2ecc71",
      cancelButtonColor: "#FF5757",
    });
    if (!result.isConfirmed) {
      Swal.fire({
        title: "Cancelled",
        text: "Parcel cancellation has been cancelled.",
        icon: "info",
        iconColor: "#FF5757",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#2ecc71",
      });
      return;
    }
    try {
      await axiosSecure.patch(`/parcels/cancel/${id}`);
      toast.success("Parcel cancelled successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel parcel.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>User Phone no:</TableHead>
            <TableHead>Recivers Name</TableHead>
            <TableHead>Recivers Phone no:</TableHead>
            <TableHead>Reciver Address</TableHead>
            <TableHead>Req* Date</TableHead>
            <TableHead>Approx* Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assigned.map((data) => (
            <TableRow key={data._id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.phone}</TableCell>
              <TableCell>{data.reciverName}</TableCell>
              <TableCell>{data.reciverNumber}</TableCell>
              <TableCell>{data.address}</TableCell>
              <TableCell>{data.reqDate}</TableCell>
              <TableCell>{data.approxDate}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-link"
                      disabled={
                        data.status === "Delivered" ||
                        data.status === "Cancelled"
                      }
                    >
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem
                      onClick={() => handleDeliverParcel(data._id)}
                    >
                      Deliver
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openMap(data)}>
                      View location
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => cancelParcel(data._id)}>
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* //? Dialogue For View Location  */}
      <Dialog open={mapOpen} onOpenChange={setmapOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          style={{
            width: "50vw",
            maxWidth: "850px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <DialogTitle>Update Your Parcel</DialogTitle>

          <ViewMap
            isLoading={isLoading}
            refetch={refetch}
            closeUpdate={closeMap}
            latitude={selectedLocation?.latitude}
            longitude={selectedLocation?.longitude}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
