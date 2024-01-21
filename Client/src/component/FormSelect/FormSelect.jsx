import "./FormSelect.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const { author, year, gender, value, page, filters } = useSelector(
    (state) => state.bookFilter
  );

  const [filter, setFilter] = useState(false);
  const {
    handleUnchecked,
    handlerCheckbox,
    checkWithPage,
    handlerClearFilters,
  } = FilterHandler();

  useEffect(() => {
    if (filters.length != 0 || value) {
      checkWithPage();
    }
  }, [page]);

  return (
    <div>
      <div>
        <div>
          <h2>Generos:</h2>
          {gender ? (
            <>
              <input
                type="checkbox"
                name=""
                id=""
                checked={gender}
                onChange={() => {
                  dispatch(setBookGenero({ gender: "" }));
                  handleUnchecked(gender);
                }}
              />
              {gender}
            </>
          ) : (
            <>
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
                        dispatch(setBookValue({ value: "" }));
                        handlerCheckbox(e.target.value);
                      } else {
                        dispatch(setBookGenero({ gender: "" }));
                        handleUnchecked(e.target.value);
                      }
                    }}
                  />
                  {g}
                </div>
              ))}
            </>
          )}
        </div>
        <hr />
        <div>
          <h2>Autores:</h2>
          {author ? (
            <>
              <input
                type="checkbox"
                name=""
                id=""
                checked={author}
                onChange={() => {
                  dispatch(setBookAuthor({ author: "" }));
                  handleUnchecked(author);
                }}
              />
              {author}
            </>
          ) : (
            <>
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
                          dispatch(setBookValue({ value: "" }));
                          handlerCheckbox(e.target.value);
                        } else {
                          dispatch(setBookAuthor({ author: "" }));
                          handleUnchecked(e.target.value);
                        }
                      }}
                    />
                    {a}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
        <hr />
        <div>
          {year ? (
            <>
              <input
                type="checkbox"
                name=""
                id=""
                checked={year}
                onChange={() => {
                  dispatch(setBookAño({ year: "" }));
                  handleUnchecked(year);
                }}
              />
              {year}
            </>
          ) : (
            <>
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
                        dispatch(setBookValue({ value: "" }));
                        handlerCheckbox(e.target.value);
                      } else {
                        dispatch(setBookAño({ year: "" }));
                        handleUnchecked(e.target.value);
                      }
                    }}
                  />
                  {y}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <hr />
      <button
        onClick={() => {
          setFilter(!filter);
        }}
      >
        Orden
      </button>
      <br />
      {filter ? (
        <div>
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
                {value === "-price" && "Mayor precio"}
                {value === "price" && "Menor precio"}
                {value === "-title" && "Descendente"}
                {value === "title" && "Ascendente"}
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
                Mayor precio
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
                Menor precio
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
                Ascendente
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
                Descendente
              </label>
            </div>
          )}
        </div>
      ) : null}
      <button onClick={handlerClearFilters}>Borrar filtros</button>
    </div>
  );
}

export default FormSelect;
