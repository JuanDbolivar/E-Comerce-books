import "./App.css";
import "bulma/css/bulma.min.css";
import Home from "./View/Home";
import Success from "./component/Success/Success";
import Cart from "./component/Cart/Cart";
import Detail from "./View/Detail/Detail";
import Footer from "./component/Footer/Footer";
import NavBar from "./component/NavBar/NavBar";
import Banned from "./component/Banned/Banned";
import StripeCheck from "./component/Stripe/StripeCheck";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

function App() {
  const { banned } = useSelector((state) => state.user);
  const [rerenderKey, setRerenderKey] = useState(0);
  let location = useLocation();
  const navigate = useNavigate();
  const rerenderHome = () => {
    setRerenderKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    banned && navigate("/banned");
  }, [banned]);

  return (
    <>
      {location.pathname !== "/banned" ? (
        <NavBar rerenderHome={rerenderHome} />
      ) : null}

      <Routes>
        <Route path="/" element={<Home rerenderKey={rerenderKey} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/success" element={<Success />} />
        <Route exact path="/banned" element={<Banned />} />
        <Route exact path="/payment" element={<StripeCheck />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
