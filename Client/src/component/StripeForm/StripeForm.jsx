import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function StripeForm() {
  const { totalUSD } = useSelector((state) => state.sendUser);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

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

        if (data.message == "Succes") {
          navigate("/checkout/success");
          setEmail("");
        }
        elements.getElement(CardElement).clear();
      } else throw error;
    } catch (error) {
      console.log("PaymentError: ", error);
    }
  };

  return (
    <div className="columns">
      <div className="column is-two-fifths">
        <form action="payments" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <div className="control">
              <input
                className="input"
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
          </div>
          <div className="field">
            <label htmlFor="card-element" className="label">
              Credit or debit card
            </label>
            <div className="field">
              <CardElement id="card-element" onChange={handleChange} />
            </div>
            <hr />
            <div role="alert">{error}</div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link">
                Comprar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Atras
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="column">
        <p>
          aca va la info del producto o productos a <strong>comprar</strong>
        </p>
      </div>
    </div>
  );
}

export default StripeForm;
