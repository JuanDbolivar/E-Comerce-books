import "./FormSelect.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter } from "../../handlers/FilterHandler/Filter";
import { FilterHandler } from "../../handlers/FilterHandler/FilterHandler";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
  setBookValue,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

function FormSelect() {
  const dispatch = useDispatch();

  const { dataA, dataY, dataG } = useSelector((state) => state.book);
  const { author, year, gender, value, organization, page } = useSelector(
    (state) => state.bookFilter
  );

  const [filter, setFilter] = useState("");
  const { sortOption } = Filter();
  const {
    handlerFilter,
    handlerAuthor,
    handlerSortChange,
    handlerSort,
    handlerClearFilters,
  } = FilterHandler();

  useEffect(() => {
    if (value && organization) {
      handlerSort();
    }
  }, [page]);

  useEffect(() => {
    if (author || year || gender) {
      handlerFilter();
    }
  }, [page]);

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
              onChange={(e) => {
                dispatch(setBookGenero({ gender: e.target.value }));
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
                onChange={(e) => {
                  dispatch(setBookAuthor({ author: e.target.value }));
                  handlerAuthor();
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
              onChange={(e) => {
                setBookAño({ year: e.target.value });
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
