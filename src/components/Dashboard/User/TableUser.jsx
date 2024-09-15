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
import UpdateForm from "./Modal/UpdateForm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ReviewModal from "./Modal/ReviewModal";
import PaymentModal from "./Modal/payment/PaymentModal";

export function TableUser({ parcels, isLoading, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [payPrice, setpayPrice] = useState(null);
  const [review, setReview] = useState(null);
  const [updateOpen, setupdateOpen] = useState(false);
  const [reviewOpen, setreviewOpen] = useState(false);
  const [paymentOpen, setpaymentOpen] = useState(false);
  const [deliveryManDetails, setDeliveryManDetails] = useState({});

  const openUpdate = (parcel) => {
    setSelectedParcel(parcel);
    setupdateOpen(true);
  };
  const closeUpdate = () => {
    setupdateOpen(false);
    setSelectedParcel(null);
  };
  const openReview = (review) => {
    setReview(review);
    setreviewOpen(true);
  };
  const closeReview = () => {
    setreviewOpen(false);
    setReview(null);
  };
  const openPayment = (payment) => {
    setpaymentOpen(true);
    setpayPrice(payment);
  };
  const closePayment = () => {
    setpaymentOpen(false);
  };
  const cancelParcel = async (id) => {
    try {
      await axiosSecure.patch(`/parcels/cancel/${id}`);
      toast.success("Parcel cancelled successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel parcel.");
    }
  };

  const fetchDeliveryManDetails = async (email) => {
    try {
      const response = await axiosSecure.get(`/users/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching deliveryMan details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = {};
      for (const parcel of parcels) {
        if (parcel.assigned) {
          try {
            const userDetails = await fetchDeliveryManDetails(parcel.assigned);
            details[parcel.assigned] = userDetails;
          } catch (error) {
            console.error(`Failed to fetch details for ${parcel.assigned}`);
          }
        }
      }
      setDeliveryManDetails(details);
    };
    fetchDetails();
  });
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels.map((data) => (
            <TableRow key={data._id}>
              <TableCell>{data.type}</TableCell>
              <TableCell>{data.reqDate}</TableCell>
              <TableCell>{data.approxDate}</TableCell>
              <TableCell>{data.bookingDate}</TableCell>
              <TableCell>
                {deliveryManDetails[data.assigned]?.name || ""}
              </TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-link"
                      disabled={data.status === "Cancelled"}
                    >
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem
                      onClick={() => openUpdate(data)}
                      disabled={data.status !== "Pending"}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openPayment(data)}
                      disabled={
                        data.payment === "Paid" || data.status !== "Delivered"
                      }
                    >
                      Pay now
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openReview(data)}
                      disabled={data.status !== "Delivered"}
                    >
                      Review
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => cancelParcel(data._id)}
                      disabled={data.status !== "Pending"}
                    >
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            width: "50vw",
            maxWidth: "850px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <DialogTitle>Update Your Parcel</DialogTitle>
          {selectedParcel && (
            <UpdateForm
              isLoading={isLoading}
              refetch={refetch}
              parcel={selectedParcel}
              closeUpdate={closeUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* //?Dialogue For Review */}
      <Dialog open={reviewOpen} onOpenChange={setreviewOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          style={{
            width: "100vw",
            maxWidth: "500px",
            maxHeight: "500px",
            height: "70vh",
            overflowY: "auto",
          }}
        >
          <ReviewModal
            isLoading={isLoading}
            refetch={refetch}
            review={review}
            closeReview={closeReview}
          />
        </DialogContent>
      </Dialog>
      {/* //?Dialogue For Payment */}
      <Dialog open={paymentOpen} onOpenChange={setpaymentOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          style={{
            width: "100vw",
            maxWidth: "450px",
            maxHeight: "300px",
            height: "70vh",
            overflowY: "auto",
          }}
        >
          <DialogTitle>Pay Now</DialogTitle>
          <PaymentModal
            isLoading={isLoading}
            refetch={refetch}
            payment={payPrice}
            closePayment={closePayment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
