import "./FormSelect.css";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter } from "../../handlers/FilterHandler/Filter";
import { FilterHandler } from "../../handlers/FilterHandler/FilterHandler";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
  setBookFilters,
  setBookValue,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

function FormSelect() {
  const dispatch = useDispatch();

  const { dataA, dataY, dataG } = useSelector((state) => state.book);
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );

  const [filter, setFilter] = useState([]);
  const { sortOption } = Filter();
  const {
    // handlerFilter,
    handleUnchecked,
    handlerCheckbox,
    handlerSortChange,
    handlerSort,
    handlerClearFilters,
  } = FilterHandler();

  useEffect(() => {
    if (value && organization) {
      handlerSort();
    }
  }, [page]);

  // useEffect(() => {
  //   if (author || year || gender) {
  //     handlerFilter();
  //   }
  // }, [page]);

  return (
    <div>
      <div>
        <h2>Generos:</h2>
        {dataG.map((g, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name={g}
              id={g}
              value={g}
              onChange={async (e) => {
                if (e.target.checked) {
                  dispatch(setBookFilters({ filters: e.target.value }));
                  dispatch(setBookGenero({ gender: e.target.value }));
                  handlerCheckbox(e.target.value);
                } else {
                  dispatch(setBookAuthor({ gender: "" }));
                  handleUnchecked();
                }
              }}
            />
            {g}
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h2>Autores:</h2>
        {dataA.map((a, index) => (
          <div key={index}>
            <label htmlFor="">
              <input
                type="checkbox"
                value={a}
                onChange={async (e) => {
                  if (e.target.checked) {
                    dispatch(setBookFilters({ filters: e.target.value }));
                    dispatch(setBookAuthor({ author: e.target.value }));
                    handlerCheckbox(e.target.value);
                  } else {
                    dispatch(setBookAuthor({ author: "" }));
                    handleUnchecked();
                  }
                }}
              />
              {a}
            </label>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h2>Años de publicacion:</h2>
        {dataY.map((y, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name=""
              id=""
              value={y}
              onChange={async (e) => {
                if (e.target.checked) {
                  dispatch(setBookFilters({ filters: e.target.value }));
                  dispatch(setBookAño({ year: e.target.value }));
                  handlerCheckbox(e.target.value);
                } else {
                  dispatch(setBookAño({ year: "" }));
                  handleUnchecked();
                }
              }}
            />
            {y}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormSelect;
