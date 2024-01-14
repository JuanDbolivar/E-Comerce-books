import "./Cart.css";
import FormBuy from "../FormBuy/FormBuy";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIdBooks } from "../../redux/reducers/Users/UserSlice";
import { setTotalUSD } from "../../redux/reducers/SendUser/sendUserSlice";

function Cart() {
  const dispatch = useDispatch();
  const { userBooks, totalBooks } = useSelector((state) => state.user);
  const { totalUSD } = useSelector((state) => state.sendUser);
  const {
    removeBookFromCart,
    addBookToCart,
    clearBookCart,
    // buyBooks,
    // checkBook,
  } = CartHandler();

  const [buy, setBuy] = useState(false);

  const total = useMemo(() => {
    const booksBack = userBooks.map((item) => item.price * item.quantity);
    const totalUSD = booksBack.reduce((suma, numero) => suma + numero, 0);
    return parseFloat(totalUSD.toFixed(2));
  }, [totalBooks]);

  // useEffect(() => {
  //   const booksBack = userBooks.map((item) => item.price * item.quantity);
  //   const totalUSD = booksBack.reduce((suma, numero) => suma + numero, 0);
  //   const totalUSDFormatted = totalUSD.toFixed(2);
  //   dispatch(setTotalUSD(parseFloat(totalUSDFormatted)));
  // }, [totalBooks]);

  useEffect(() => {
    dispatch(setTotalUSD(total));
  }, [total]);

  useEffect(() => {
    const booksId = userBooks.map((book) => book.id);
    if (booksId) {
      dispatch(setIdBooks({ idBooks: booksId }));
    }
  }, []);

  return (
    <>
      {userBooks.length === 0 ? (
        <div className="content">
          <h1> Todavia no tienes libros agregados al carrito </h1>
          <h1>🥲</h1>
        </div>
      ) : (
        <>
          <table className="table table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {userBooks.map((book) => (
                <tr key={book.id}>
                  <th>
                    <Link to={`/detail/${book.id}`}>{book.title}</Link>
                  </th>
                  <td>{book.author}</td>
                  <td>US$ {book.price}</td>
                  <td>
                    <button
                      className="button is-danger is-small"
                      onClick={() => {
                        removeBookFromCart(book.id);
                      }}
                    >
                      -
                    </button>
                    <span className="quantity">
                      <strong>{book.quantity} </strong>
                    </span>
                    <button
                      className="button is-primary is-small"
                      onClick={() => {
                        addBookToCart(book.id);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tags has-addons">
            <span className="tag is-primary is-large">
              Cantidad total: {totalBooks}
            </span>
            <span className="tag is-success is-large">
              Total US$: {totalUSD}
            </span>
          </div>
          <br />
          <button onClick={clearBookCart} className="button is-danger clean ">
            Limpiar carrito
          </button>
          <button
            onClick={() => {
              setBuy(!buy);
            }}
            className="button is-primary buy"
          >
            {buy ? "Volver" : "Comprar ahora"}
          </button>
          {buy ? <FormBuy /> : null}
        </>
      )}
    </>
  );
}

export default Cart;
