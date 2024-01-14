import "./Home.css";
import axios from "axios";
import Cards from "../component/Cards/Cards";
import Paginado from "../component/Paginado/Paginado";
import FormSelect from "../component/FormSelect/FormSelect";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBook,
  setDataA,
  setDataY,
  setDataG,
  setTotalData,
} from "../redux/reducers/Books/booksSlice";

function Home({ rerenderKey }) {
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );
  const { totalData, books } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!author && !year && !gender && !value && !organization) {
      const homeFuntion = async () => {
        try {
          const { data } = await axios(`
          http://localhost:8000/book/?page_size=${page}`);
          if (data) {
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
            dispatch(setBook(data.results));
          }
        } catch (error) {
          console.log("errorHome", error);
        }
      };
      homeFuntion();
    }
  }, [page]);

  useEffect(() => {
    const cositas = async () => {
      const { data } = await axios(
        "http://localhost:8000/list-author-year-gender/list/"
      );
      if (data) {
        dispatch(setDataA(data.authors));
        dispatch(setDataY(data.years));
        dispatch(setDataG(data.genders));
      }
    };
    cositas();
  }, []);

  return (
    <div key={rerenderKey}>
      <br />
      <div className="page">
        <Paginado />
      </div>
      <div className="columns">
        <div className=" column is-one-fifth">
          <FormSelect />
        </div>

        <div className="column">
          {books.length === 0 && totalData === 1 ? (
            <div className="content">
              <h3>Lo sentimos, al momento no contamos con ese libro</h3>
              <h1>🥲</h1>
            </div>
          ) : books.length === 0 && (author || year || gender) ? (
            <div className="content">
              <h3>
                Lo sentimos, al momento no contamos con libros que tengan esas
                características
              </h3>
              <h1>🥲</h1>
            </div>
          ) : (
            <div className="containerB">
              <Cards />
            </div>
          )}
        </div>
      </div>
      <div className="pageBottom">
        <Paginado />
      </div>
    </div>
  );
}

export default Home;
