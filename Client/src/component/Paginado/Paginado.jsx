import "./Paginado.css";
import { useDispatch, useSelector } from "react-redux";
import { setBookPage } from "../../redux/reducers/BookFilter/BookFilterSlice";

function Paginado() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.bookFilter);
  const { totalData } = useSelector((state) => state.book);

  const handlePaginaAnterior = () => {
    if (page > 1) {
      const prevPage = page - 1;
      dispatch(setBookPage({ page: prevPage }));
    }
  };

  const handlePaginaSiguiente = () => {
    const nextPage = page + 1;
    dispatch(setBookPage({ page: nextPage }));
  };

  return (
    <div className="paginations">
      <button
        onClick={handlePaginaAnterior}
        disabled={page === 1}
        className="button is-info"
      >
        ⇦
      </button>
      <span>
        Página {page} de {totalData}
      </span>
      <button
        onClick={handlePaginaSiguiente}
        disabled={page >= totalData || totalData === 0 ? true : false}
        className="button is-info"
      >
        ⇨
      </button>
    </div>
  );
}

export default Paginado;
