import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/react-stripe-js";
import StripeForm from "../stripeForm/stripeForm";
const stripePromise = loadStripe(
  "pk_test_51OLAvzH7aI4EeVzAk0sdZfNGVbgapash1hwTKZCGGxzoUH8BRC4pYpiDblfsCosBCH0zjy4tzNgif3opR6grn2Zu00m7Yf5E1V"
);

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
}

export default Stripe;
