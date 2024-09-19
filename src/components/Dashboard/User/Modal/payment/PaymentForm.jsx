import "./PaymentForm.css";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import ReactConfetti from "react-confetti";

const PaymentForm = ({ payment, closePayment, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (payment?.price && payment?.price > 1) {
      getClientSecret({ price: payment?.price });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.price]);

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    console.log("clientSecret from server--->", data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.patch(`/parcels/update/${payment?._id}`, {
          payment: "Paid",
        });
        setPaymentSuccess(true);
        toast.success("Payment Successfull");
        setTimeout(() => {
          refetch();
          closePayment();
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    }
    setProcessing(false);
  };

  return (
    <>
      {paymentSuccess && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="payment-info mb-5 font-open text-headL dark:text-headD space-y-1">
          <h3 className="text-xl font-semibold  ">Payment Details</h3>
          <p className="font-light text-sm">
            <strong className="font-semibold">Recipient:</strong>{" "}
            {payment?.name}
          </p>

          <p className="font-light text-sm">
            <strong className="font-semibold">Booking Date:</strong>{" "}
            {payment?.bookingDate}
          </p>
          <p className="font-light text-sm">
            <strong className="font-semibold">Approx. Delivery Date:</strong>{" "}
            {payment?.approxDate}
          </p>
          <p className="text-lg font-bold mt-4">
            <strong className="font-normal">Total Price:</strong>{" "}
            {payment?.price}tk
          </p>
        </div>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex mt-2 justify-center gap-4">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 h-10"
          >
            {processing ? (
              <ClipLoader
                color="#FFB8B8"
                loading
                size={18}
                speedMultiplier={2}
              />
            ) : (
              `Pay ${payment?.price}tk`
            )}
          </button>
          <button
            onClick={closePayment}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 h-10"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

PaymentForm.propTypes = {
  payment: PropTypes.object,
  closePayment: PropTypes.func,
  refetch: PropTypes.func,
};

export default PaymentForm;
