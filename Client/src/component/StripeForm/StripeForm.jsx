import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function StripeForm() {
  const { totalUSD } = useSelector((state) => state.sendUser);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
      if (!error) {
        const { id } = paymentMethod;
        const { data } = await axios.post(
          "http://localhost:8000/payments/save-stripe-info/",
          {
            payment_method_id: id,
            email,
            amount: Math.round(totalUSD * 100),
          }
        );
        console.log("data", data);
        elements.getElement(CardElement).clear();
      } else throw error;
    } catch (error) {
      console.log("PaymentError: ", error);
    }
  };

  return (
    <form action="payments" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="name"
          placeholder="youremail@email.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div role="alert">{error}</div>
      </div>
      <button type="submit">Comprar</button>
    </form>
  );
}

export default StripeForm;
