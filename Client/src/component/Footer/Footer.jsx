import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column is-half">
          <Link to="https://www.facebook.com" target="_blank">
            facebook
          </Link>
          <br />
          <Link to="https://www.twitter.com" target="_blank">
            twitter
          </Link>
          <br />
          <Link to="https://www.instagram.com" target="_blank">
            instagram
          </Link>
        </div>
        <div className="column">
          <a href="#arriba">⬆︎⬆︎</a>
          <br />
          <h3>Direccion: Calle falsa 123</h3>
          <h3>pflibrosgrupo07@gmail.com</h3>
          <h3>Numero de contacto:</h3>
        </div>
      </div>
      <div className="content has-text-centered">
        <p>Copyright © </p>
      </div>
    </footer>
  );
}

export default Footer;
