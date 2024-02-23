import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (!error) {
        const { id } = paymentMethod();
        const { data } = await axios.post("http://localhost:8000", {
          id,
          amount: 10,
        });
        elements.getElement(CardElement).clear();
      } else throw error;
    } catch (error) {
      console.log("PaymentError: ", error.mesage);
    }
  };

  return (
    <form action="payments" onSubmit={handleSubmit}>
      <CardElement />
      <button>Comprar</button>
    </form>
  );
}

export default StripeForm;
