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
      <h1>Compra exitosa</h1>
      <Link to="/">
        <button>Regresar al comercio</button>
      </Link>
    </>
  );
}

export default Success;
