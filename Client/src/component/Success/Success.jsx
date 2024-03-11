import axios from "axios";
import { url } from "../../values/values";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Success() {
  const { userName, userEmail, booksName, userAddress, totalUSD } = useSelector(
    (state) => state.sendUser
  );

  const message = `Hola! ${userName}, tu compra de ${booksName} por un total de ${totalUSD} USD, fue exitosa!. Tus productos te seren entregados en la direcciòn ${userAddress} en los proximos dias.`;
  useEffect(() => {
    const success = async () => {
      try {
        const { data } = await axios.post(`${url}send-mail/`, {
          addressee: userEmail,
          message,
        });
        if (data) {
        }
      } catch (error) {
        console.log("succesError: ", error);
      }
    };
    success();
  }, []);

  return (
    <>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">Enhora buena! Tu compra ha sido exitosa</p>
            <p className="subtitle">
              <Link to="/">
                <button className="button is-primary">
                  Regresar al comercio
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Success;
