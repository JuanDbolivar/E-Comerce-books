import axios from "axios";
import { useCallback } from "react";
import { url } from "../../values/values";
import { useDispatch, useSelector } from "react-redux";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
  unSetBookFilters,
  setBookValue,
  setBookPage,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

export function FilterHandler() {
  const dispatch = useDispatch();
  const { value, page, filters } = useSelector((state) => state.bookFilter);

  const handleUnchecked = useCallback(
    async (e, isOrder = false) => {
      try {
        if (e != "-price" && e != "price" && e != "title" && e != "-title") {
          let newFilter;
          if (filters.length === 3) {
            newFilter = filters.filter((f) => f !== e);
          } else if (filters.length === 2) {
            newFilter = filters.filter((f) => f !== e);
          } else if (filters.length === 1) {
            newFilter = [];
          }

          const { data } = await axios.get(
            `${url}book/?search=${newFilter.join("&search=")}`
          );

          dispatch(unSetBookFilters({ filters: newFilter }));
          if (data) {
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
            dispatch(setBook(data.results));
            dispatch(setBookPage({ page: 1 }));
          }
        } else if (filters.length != 0 && isOrder) {
          if (filters.length === 3) {
            const { data } = await axios.get(
              `${url}book/?page_size=1&search=${filters[0]}&search=${filters[1]}&search=${filters[2]}`
            );
            if (data) {
              dispatch(setBook(data.results));
              const totalPages = Math.ceil(data.count / 10);
              dispatch(setTotalData(totalPages));
            }
          } else if (filters.length === 2) {
            const { data } = await axios.get(
              `${url}book/?page_size=1&search=${filters[0]}&search=${filters[1]}`
            );
            if (data) {
              dispatch(setBook(data.results));
              const totalPages = Math.ceil(data.count / 10);
              dispatch(setTotalData(totalPages));
            }
          } else if (filters.length === 1) {
            const { data } = await axios.get(
              `${url}book/?page_size=1&search=${filters[0]}`
            );
            if (data) {
              dispatch(setBook(data.results));
              const totalPages = Math.ceil(data.count / 10);
              dispatch(setTotalData(totalPages));
              console.log("data", data);
            }
          }
        } else {
          const { data } = await axios.get(`${url}book/?page_size=1`);
          if (data) {
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
            dispatch(setBook(data.results));
            dispatch(setBookPage({ page: 1 }));
          }
        }
      } catch (error) {
        console.log("errorUncheck:", error.message);
      }
    },
    [dispatch, filters]
  );

  const handlerCheckbox = useCallback(
    async (e) => {
      try {
        if (e != "-price" && e != "price" && e != "title" && e != "-title") {
          const { data } = await axios.get(
            `${url}book/?search=${filters.join("&search=")}&search=${e}`
          );
          if (data) {
            dispatch(setBook(data.results));
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
          }
        } else if (filters.length === 0) {
          const { data } = await axios.get(
            `${url}book/?ordering=${e}&page_size=1`
          );
          if (data) {
            dispatch(setBook(data.results));
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
          }
        } else if (filters.length != 0) {
          if (filters.length === 3) {
            const { data } = await axios.get(
              `${url}book/?ordering=${e}&page_size=1&search=${filters[0]}&search=${filters[1]}&search=${filters[2]}`
            );
            if (data) {
              dispatch(setBook(data.results));
              const totalPages = Math.ceil(data.count / 10);
              dispatch(setTotalData(totalPages));
            }
          } else if (filters.length === 2) {
            const { data } = await axios.get(
              `${url}book/?ordering=${e}&page_size=1&search=${filters[0]}&search=${filters[1]}`
            );
            if (data) {
              dispatch(setBook(data.results));
              const totalPages = Math.ceil(data.count / 10);
              dispatch(setTotalData(totalPages));
            }
          } else if (filters.length === 1) {
            const { data } = await axios.get(
              `${url}book/?ordering=${e}&page_size=1&search=${filters[0]}`
            );
            if (data) {
              dispatch(setBook(data.results));
              const totalPages = Math.ceil(data.count / 10);
              dispatch(setTotalData(totalPages));
            }
          }
        }
      } catch (error) {
        console.log("errorCheck", error.message);
      }
    },
    [dispatch, filters, value]
  );

  const checkWithPage = async () => {
    try {
      if (filters.length === 3) {
        const { data } = await axios.get(
          `${url}book/?search=${filters[0]}&search=${filters[1]}&search=${filters[2]}&page_size=${page}`
        );
        if (data) {
          dispatch(setBook(data.results));
          const totalPages = Math.ceil(data.count / 10);
          dispatch(setTotalData(totalPages));
        }
      }
      if (filters.length === 2) {
        const { data } = await axios.get(
          `${url}book/?search=${filters[0]}&search=${filters[1]}&page_size=${page}`
        );
        if (data) {
          dispatch(setBook(data.results));
          const totalPages = Math.ceil(data.count / 10);
          dispatch(setTotalData(totalPages));
        }
      }
      if (filters.length === 1) {
        const { data } = await axios.get(
          `${url}book/?search=${filters[0]}&page_size=${page}`
        );
        if (data) {
          dispatch(setBook(data.results));
          const totalPages = Math.ceil(data.count / 10);
          dispatch(setTotalData(totalPages));
        }
      }
      if (value && filters.length === 0) {
        const { data } = await axios.get(
          `${url}book/?ordering=${value}&page_size=${page}`
        );
        if (data) {
          dispatch(setBook(data.results));
          const totalPages = Math.ceil(data.count / 10);
          dispatch(setTotalData(totalPages));
        }
      }
      if (value && filters.length != 0) {
        if (filters.length === 3) {
          const { data } = await axios.get(
            `${url}book/?ordering=${value}&page_size=${page}&search=${filters[0]}&search=${filters[1]}&search=${filters[2]}`
          );
          if (data) {
            dispatch(setBook(data.results));
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
          }
        } else if (filters.length === 2) {
          const { data } = await axios.get(
            `${url}book/?ordering=${value}&page_size=${page}&search=${filters[0]}&search=${filters[1]}`
          );
          if (data) {
            dispatch(setBook(data.results));
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
          }
        } else if (filters.length === 1) {
          const { data } = await axios.get(
            `${url}book/?ordering=${value}&page_size=${page}&search=${filters[0]}`
          );
          if (data) {
            dispatch(setBook(data.results));
            const totalPages = Math.ceil(data.count / 10);
            dispatch(setTotalData(totalPages));
            console.log("data", data);
          }
        }
      }
    } catch (error) {
      console.log("errorCheckPage", error.message);
    }
  };

  const handlerClearFilters = async () => {
    dispatch(unSetBookFilters({ filters: [] }));
    dispatch(setBookAuthor({ author: "" }));
    dispatch(setBookAño({ year: "" }));
    dispatch(setBookGenero({ gender: "" }));
    dispatch(setBookValue({ value: "" }));
    dispatch(setBookPage({ page: 1 }));
    try {
      const { data } = await axios.get(`${url}book/`);
      if (data) {
        const totalPages = Math.ceil(data.count / 10);
        dispatch(setTotalData(totalPages));
        dispatch(setBook(data.results));
      }
    } catch (error) {
      console.log("errorClearCheck", error.message);
    }
  };

  return {
    handleUnchecked,
    handlerCheckbox,
    checkWithPage,
    handlerClearFilters,
  };
}
