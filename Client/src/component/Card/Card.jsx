import "./Card.css";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CardBook({ book }) {
  const { userBooks } = useSelector((state) => state.user);

  const { id, title, image, price, active } = book;
  const { putOrRemoveBookToCart } = CartHandler();

  return (
    <>
      {active ? (
        <div className="card">
          <Link to={`/detail/${id}`}>
            <img src={image} alt="book's image" />
            <h1>{title}</h1>
            <h3 className="price">USD$ {price} </h3>
          </Link>
          <div className="card-button">
            <button
              className={
                userBooks.find((book) => book.id === id)
                  ? " button is-danger"
                  : "button is-primary"
              }
              onClick={() => {
                putOrRemoveBookToCart(id);
              }}
            >
              {userBooks.find((book) => book.id === id)
                ? "Remover del "
                : "Agregar al "}
              carrito
            </button>
          </div>
        </div>
      ) : (
        <div className="card-dissable">
          <div className="card-image">
            <img src={image} alt="book's image" />
          </div>
          <div className="card-content">
            <h1>{title}</h1>
          </div>
          <div>
            <h3 className="price">USD$ {price} </h3>
          </div>
          <div className="card-tarjeta">
            <button disabled className="button is-primary">
              Agotado
            </button>
          </div>
        </div>
      )}
    </>
  );
}
//
export default CardBook;
