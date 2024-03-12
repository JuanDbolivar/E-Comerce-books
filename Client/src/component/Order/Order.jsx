import "./Order.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterHandler } from "../../handlers/FilterHandler/FilterHandler";
import { setBookValue } from "../../redux/reducers/BookFilter/BookFilterSlice";

function Order() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(false);
  const { value, filters, page } = useSelector((state) => state.bookFilter);

  const { handleUnchecked, handlerCheckbox, checkWithPage } = FilterHandler();

  useEffect(() => {
    if (filters.length != 0 || value) {
      checkWithPage();
    }
  }, [page]);

  return (
    <div className="caracteristicas">
      <div className={filter ? "dropdown is-active" : "dropdown"}>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            onClick={() => {
              setFilter(!filter);
            }}
          >
            <span>Características ⬇︎</span>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              {value ? (
                <>
                  <label htmlFor="value">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => {
                        dispatch(setBookValue({ value: "" }));
                        handleUnchecked(value, true);
                      }}
                    />
                    {value === "-price" && "Precio, mayor a menor"}
                    {value === "price" && "Precio, menor a mayor"}
                    {value === "-title" && "Alfabéticamente, Z-A"}
                    {value === "title" && "Alfabéticamente, A-Z"}
                  </label>
                </>
              ) : (
                <div>
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      value="-price"
                      onChange={(e) => {
                        dispatch(setBookValue({ value: e.target.value }));
                        handlerCheckbox(e.target.value, true);
                      }}
                    />
                    Precio, mayor a menor
                  </label>
                  <br />
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      value="price"
                      onChange={(e) => {
                        dispatch(setBookValue({ value: e.target.value }));
                        handlerCheckbox(e.target.value, true);
                      }}
                    />
                    Precio, menor a mayor
                  </label>
                  <br />
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      value="title"
                      onChange={(e) => {
                        dispatch(setBookValue({ value: e.target.value }));
                        handlerCheckbox(e.target.value, true);
                      }}
                    />
                    Alfabéticamente, A-Z
                  </label>
                  <br />
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      value="-title"
                      onChange={(e) => {
                        dispatch(setBookValue({ value: e.target.value }));
                        handlerCheckbox(e.target.value, true);
                      }}
                    />
                    Alfabéticamente, Z-A
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
