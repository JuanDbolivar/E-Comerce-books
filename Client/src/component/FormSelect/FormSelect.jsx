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
    handlerAutorChange,
    handlerYearChange,
    handlerGenderChange,
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
    <ul className="Contenido-selects">
      <li className="li">
        <div className="field">
          <label className="label">Autor</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                className="select"
                name="author"
                value={author}
                onChange={handlerAutorChange}
              >
                <option label="Filtrar..."></option>
                {dataA.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {author && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={author}
                onChange={() => dispatch(setBookAuthor({ author: "" }))}
              />
              {author}
            </label>
          </div>
        )}
      </li>

      <li className="li">
        <div className="field">
          <label className="label">Año</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="year" value={year} onChange={handlerYearChange}>
                <option label="Filtrar..."></option>
                {dataY.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {year && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={year}
                onChange={() => dispatch(setBookAño({ year: "" }))}
              />
              {year}
            </label>
          </div>
        )}
      </li>

      <li className="li">
        <div className="field">
          <label className="label">Género</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="gender"
                value={gender}
                onChange={handlerGenderChange}
              >
                <option label="Filtrar..."></option>
                {dataG.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {gender && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={gender}
                onChange={() => dispatch(setBookGenero({ gender: "" }))}
              />
              {gender}
            </label>
          </div>
        )}
      </li>
      <button
        className="button is-primary is-hovered"
        onClick={handlerFilter}
        disabled={author || year || gender ? false : true}
      >
        Filtrar
      </button>

      <li className="li">
        <div className="field">
          <label className="label">Ordenar por...</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="value"
                value={value}
                onChange={(e) => {
                  handlerSortChange(e);
                  setFilter(e.target.value);
                }}
              >
                <option label="Ordenar..."></option>
                {sortOption.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {value && (
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={value}
                onChange={() => dispatch(setBookValue({ value: "" }))}
              />
              {filter}
            </label>
          </div>
        )}
      </li>
      <button
        disabled={!value ? true : false}
        className="button is-primary is-hovered"
        onClick={handlerSort}
      >
        Ordenar
      </button>
      <div className="clear">
        <button
          disabled={author || year || gender || value ? false : true}
          className="button is-primary is-hovered "
          onClick={handlerClearFilters}
        >
          Borrar filtros
        </button>
      </div>
    </ul>
  );
}

export default FormSelect;
