import "./Detail.css";
import axios from "axios";
import CartHandler from "../../handlers/CartHandler/CartHandler";
import { url } from "../../values/values";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setBookDetail,
  setCommentations,
} from "../../redux/reducers/BookDetail/BookDetailSlice";
import Reviews from "../../component/Reviews/Reviews";

function Detail() {
  const dispatch = useDispatch();

  const { detail, commentations, enviado } = useSelector(
    (state) => state.bookDetail
  );
  const { idBooks, email, userBooks } = useSelector((state) => state.user);

  const { putOrRemoveBookToCart } = CartHandler();

  const { id } = useParams();

  useEffect(() => {
    const detailHandler = async (id) => {
      try {
        const { data } = await axios(`${url}${id}/`);

        if (data) {
          console.log("data", data);
          dispatch(setBookDetail(data));
          dispatch(setCommentations(data.comments));
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    detailHandler(id);
  }, [id, enviado]);

  return (
    <>
      <div className="columns">
        <div className=" column is-two-fifths">
          <img src={detail.image} alt="book's image" className="bookImage" />
        </div>

        <div className="column">
          <article className="content">
            <h1>Autor: {detail.author}</h1>
            <h1>Titulo: {detail.title}</h1>
            <p>
              <strong> Descripcion: </strong>
              {detail.description}
            </p>
            <p>
              <strong>Año de publicacion: </strong> {detail.year}
            </p>
            <p>
              <strong>Paginas: </strong>
              {detail.pages}
            </p>
            <h4>Genero: {detail.gender}</h4>
            <h3>Precio: US$ {detail.price} </h3>
          </article>
          <div className="card-tarjeta">
            <button
              className={
                userBooks.find((book) => book.id === detail.id)
                  ? " button is-danger"
                  : "button is-primary"
              }
              onClick={() => {
                putOrRemoveBookToCart(detail.id);
              }}
            >
              {userBooks.find((book) => book.id === detail.id)
                ? "Remover del "
                : "Agregar al "}
              carrito
            </button>
          </div>
        </div>
      </div>
      {commentations.length !== 0 &&
        commentations.map((comment, index) => (
          <div key={index} className="box">
            <article>
              <p>
                <strong> {comment.user.name}</strong>
                <br />
                Reseña: {comment.commentations}
              </p>
            </article>
          </div>
        ))}
      {email && idBooks.includes(Number(id)) ? <Reviews /> : null}
    </>
  );
}

export default Detail;
