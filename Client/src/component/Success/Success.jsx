import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unSetSendUser } from "../../redux/reducers/SendUser/sendUserSlice";

function Success() {
  const dispatch = useDispatch();

  const { totalUSD, userName, userEmail, booksName, userAddress } = useSelector(
    (state) => state.sendUser
  );

  useEffect(() => {
    const sendEmail = async () => {
      const { data } = await axios.post(
        `https://e-commerce-pf-henry.onrender.com/send-email?userEmail=${userEmail}&totalUSD=${totalUSD}&booksName=${booksName}&userName=${userName}&userAddress=${userAddress}`
      );
      if (data) {
        dispatch(unSetSendUser());
      }
    };
    sendEmail();
  }, []);

  return (
    <div className="content">
      <h1>Pago Exitoso</h1>

      <h3>Gracias por su compra</h3>
      <Link to={"/"}>
        <button className="button button is-primary">Volver al inicio</button>
      </Link>
    </div>
  );
}

export default Success;
