import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const PaymentModal = ({ payment, closePayment, refetch }) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm
          payment={payment}
          refetch={refetch}
          closePayment={closePayment}
        />
      </Elements>
    </>
  );
};

export default PaymentModal;
