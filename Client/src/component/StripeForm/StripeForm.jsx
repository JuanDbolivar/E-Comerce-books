import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { url } from "../../values/values";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StripeForm() {
  const { userBooks } = useSelector((state) => state.user);
  const { totalUSD, userEmail } = useSelector((state) => state.sendUser);

  const [error, setError] = useState(null);
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
        const { data } = await axios.post(`${url}payments/save-stripe-info/`, {
          payment_method_id: id,
          email: userEmail,
          amount: Math.round(totalUSD * 100),
        });

        if (data.message == "Succes") {
          navigate("/checkout/success");
        }
        elements.getElement(CardElement).clear();
      } else throw error;
    } catch (error) {
      console.log("PaymentError: ", error);
    }
  };

  return (
    <div className="stripe-container">
      <div className="columns">
        <div className="column is-one-third">
          <form action="payments" onSubmit={handleSubmit}>
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
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Portada</th>
                <th>Titulo</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th>TOTAL: USD$ {totalUSD}</th>
              </tr>
            </tfoot>
            <tbody>
              {userBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img
                      src={book.image}
                      alt="bookImage"
                      className="image is-96x96"
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StripeForm;
