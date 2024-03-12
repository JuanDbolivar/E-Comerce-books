import axios from "axios";
import { url } from "../../values/values";
import styles from "./NavBar.module.css";
import logo from "./../../img/logo2.png";
import RegisterLogin from "../RegisterLogin/RegisterLogin";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm) {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() !== "") {
        const { data } = await axios(`${url}book/?search=${searchTerm}`);
        if (data) {
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
    <>
      <nav
        className="navbar is-fixed-top is-info"
        role="navigation"
        aria-label="main navigation"
        id="arriba"
      >
        <div className="navbar-brand">
          <NavLink to="/" onClick={handleNavLinkClick} className="navbar-item">
            <img className={styles.logo} src={logo} alt="logo" />
            <span className="spann"> E-Commerce Books</span>
          </NavLink>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <input
                className={styles.searchinput}
                type="text"
                placeholder="Buscar libros por titulo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="button is-light" onClick={handleSearch}>
                Buscar
              </button>
            </div>
            <NavLink
              to="/"
              onClick={handleNavLinkClick}
              className="navbar-item"
            >
              Inicio
            </NavLink>
            <Link to="/cart" className="navbar-item">
              Carrrito
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <RegisterLogin />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
    </>
  );
};

export default Navbar;
