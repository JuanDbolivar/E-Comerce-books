import axios from "axios";
import styles from "./NavBar.module.css";
import RegisterLogin from "../RegisterLogin/RegisterLogin";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";
import logo from "./../../img/logo2.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { id, admin } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() !== "") {
        const { data } = await axios(
          `http://localhost:8000/book/?search=${searchTerm}`
        );
        if (data) {
          console.log("data", data);
          dispatch(setBook(data.results));
          dispatch(setTotalData(1));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleNavLinkClick = () => {
    rerenderHome();
  };

  return (
    <nav className={styles.navbar} id="arriba">
      <>
        <div className={styles.brand}>
          <NavLink to="/" onClick={handleNavLinkClick}>
            <img className={styles.logo} src={logo} alt="logo" />
          </NavLink>

          <span className="spann"> E-Commerce Books</span>
        </div>
        <div className={styles.searchbar}>
          <input
            className={styles.searchinput}
            type="text"
            placeholder="Buscar libros por titulo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchbutton} onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <ul className={styles.navlinks}>
          <li>
            <NavLink to="/" onClick={handleNavLinkClick}>
              Inicio
            </NavLink>
          </li>
          <li>
            <Link to="/cart">Carrrito</Link>
          </li>
          <li className={styles.login}>
            <RegisterLogin />
          </li>
        </ul>
      </>
    </nav>
  );
};

export default Navbar;
