import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { unSetUser } from "../../redux/reducers/Users/UserSlice";

function Banned() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await signOut(auth);
    dispatch(unSetUser());
  };

  return (
    <div className="content">
      <h1>
        Tu perfil esta baneado, favor regresa a la pagina principal desde el
        siguiente boton:
      </h1>
      <button className="button is-primary" onClick={logoutHandler}>
        <Link to="/">Atras</Link>
      </button>
    </div>
  );
}

export default Banned;
