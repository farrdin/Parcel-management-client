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
import Swal from "sweetalert2";

export function TableUser({ parcels, isLoading, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [payPrice, setpayPrice] = useState(null);
  const [review, setReview] = useState(null);
  const [updateOpen, setupdateOpen] = useState(false);
  const [reviewOpen, setreviewOpen] = useState(false);
  const [paymentOpen, setpaymentOpen] = useState(false);
  const [deliveryManDetails, setDeliveryManDetails] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this parcel?",
        icon: "warning",
        iconColor: "#FF5757",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#FF5757",
      });
      if (result.isConfirmed) {
        await axiosSecure.patch(`/parcels/cancel/${id}`);
        Swal.fire({
          title: "Cancelled",
          text: "Parcel has been cancelled successfully!",
          icon: "success",
          iconColor: "#FF5757",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#2ecc71",
        });
        refetch();
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Parcel cancellation has been aborted.",
          icon: "info",
          iconColor: "#FF5757",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#2ecc71",
        });
      }
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
      const uniqueAssignedEmails = [
        ...new Set(parcels.map((parcel) => parcel.assigned)),
      ];

      const promises = uniqueAssignedEmails.map(async (email) => {
        if (email) {
          const userDetails = await fetchDeliveryManDetails(email);
          details[email] = userDetails;
        }
      });

      await Promise.all(promises);
      setDeliveryManDetails(details);
    };
    fetchDetails();
  }, [parcels]);

  const filteredParcels =
    filterStatus === "All"
      ? parcels
      : parcels.filter((parcel) => parcel.status === filterStatus);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label
          htmlFor="status-filter"
          className="mr-2 font-semibold font-open text-headL"
        >
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-2 py-2 border rounded-md dark:border-link dark:bg-gray-50 dark:text-headL focus:dark:border-link font-open text-headL text-xs"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="On the way">On The Way</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
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
          {filteredParcels.map((data) => (
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
                      disabled={
                        data.status === "Cancelled" ||
                        data.status === "On the way" ||
                        (data.review === "Reviewd" && data.payment === "Paid")
                      }
                    >
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {data.status === "Pending" && (
                      <DropdownMenuItem
                        onClick={() => openUpdate(data)}
                        disabled={data.status !== "Pending"}
                      >
                        Update
                      </DropdownMenuItem>
                    )}
                    {!(
                      data.payment === "Paid" || data.status !== "Delivered"
                    ) && (
                      <DropdownMenuItem
                        onClick={() => openPayment(data)}
                        disabled={
                          data.payment === "Paid" || data.status !== "Delivered"
                        }
                      >
                        Pay now
                      </DropdownMenuItem>
                    )}
                    {!(
                      data.status !== "Delivered" || data.review === "Reviewd"
                    ) && (
                      <DropdownMenuItem
                        onClick={() => openReview(data)}
                        disabled={
                          data.status !== "Delivered" ||
                          data.review === "Reviewd"
                        }
                      >
                        Review
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {data.status === "Pending" && (
                      <DropdownMenuItem
                        onClick={() => cancelParcel(data._id)}
                        disabled={data.status !== "Pending"}
                      >
                        Cancel
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialogue For Update */}
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
      {/* Dialogue For Review */}
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
      {/* Dialogue For Payment */}
      <Dialog open={paymentOpen} onOpenChange={setpaymentOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          style={{
            width: "100vw",
            maxWidth: "500px",
            maxHeight: "300px",
            height: "100vh",
            overflowY: "auto",
          }}
        >
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
