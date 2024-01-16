import axios from "axios";
import { url } from "../../values/values";
import { useDispatch, useSelector } from "react-redux";
import { setBook, setTotalData } from "../../redux/reducers/Books/booksSlice";
import {
  setBookAuthor,
  setBookAño,
  setBookGenero,
  setBookFilters,
  setBookValue,
  setBookOrganization,
  setBookPage,
} from "../../redux/reducers/BookFilter/BookFilterSlice";

export function FilterHandler() {
  const dispatch = useDispatch();
  const { author, year, gender, value, organization, page, filters } =
    useSelector((state) => state.bookFilter);

  const handleUnchecked = async () => {
    const { data } = await axios.get(`${url}/book/`);
    if (data) {
      dispatch(setBook(data.results));
    }
  };

  const handlerCheckbox = async (e) => {
    console.log("filters", filters);
    if (filters.length === 0) {
      const { data } = await axios.get(`${url}book/?search=${e}`);
      if (data) {
        dispatch(setBook(data.results));
        // console.log("data.results", data.results);
      }
    }
    if (filters.length === 1) {
      const { data } = await axios.get(
        `${url}book/?search=${filters[0]}&search=${e}`
      );
      if (data) {
        dispatch(setBook(data.results));
      }
    }
    if (filters.length === 2) {
      const { data } = await axios.get(
        `${url}book/?search=${filters[0]}&search=${filters[1]}&search=${e}`
      );
      if (data) {
        dispatch(setBook(data.results));
      }
    }
  };

  const handlerSortChange = (e) => {
    if (e.target.value === "Titilo A-Z") {
      dispatch(setBookValue({ value: "title" }));
      dispatch(setBookOrganization({ organization: "ASC" }));
      dispatch(setBookPage({ page: 1 }));
    }
    if (e.target.value === "Titilo Z-A") {
      dispatch(setBookValue({ value: "title" }));
      dispatch(setBookOrganization({ organization: "DESC" }));
      dispatch(setBookPage({ page: 1 }));
    }
    if (e.target.value === "Precio menor") {
      dispatch(setBookValue({ value: "price" }));
      dispatch(setBookOrganization({ organization: "ASC" }));
      dispatch(setBookPage({ page: 1 }));
    }
    if (e.target.value === "Precio mayor") {
      dispatch(setBookValue({ value: "price" }));
      dispatch(setBookOrganization({ organization: "DESC" }));
      dispatch(setBookPage({ page: 1 }));
    }
  };

  const handlerSort = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const { data } = await axios(
        `https://e-commerce-pf-henry.onrender.com/book/booksort?value=${value}&organization=${organization}&page=${page}`
      );
      if (data) {
        const totalPages = Math.ceil(data.count / 4);
        dispatch(setBook(data.rows));
        dispatch(setTotalData(totalPages));
      }
    } catch (error) {
      console.log("errorAxios", error.message);
    }
  };

  // const handlerFilter = async () => {
  //   try {
  //     const { data } = await axios(
  //       `https://e-commerce-pf-henry.onrender.com/book/filter?author=${author}&year=${year}&gender=${gender}&page=${page}`
  //     );
  //     if (data) {
  //       const totalPages = Math.ceil(data.count / 4);
  //       dispatch(setTotalData(totalPages));
  //       dispatch(setBook(data.filteredBooks));
  //     }
  //   } catch (error) {
  //     console.log("errorAxios", error.message);
  //   }
  // };

  const handlerClearFilters = async () => {
    dispatch(setBookAuthor({ author: "" }));
    dispatch(setBookAño({ year: "" }));
    dispatch(setBookGenero({ gender: "" }));
    dispatch(setBookValue({ value: "" }));
    dispatch(setBookOrganization({ organization: "" }));
    dispatch(setBookPage({ page: 1 }));
    try {
      const { data } = await axios(
        `https://e-commerce-pf-henry.onrender.com/book?page=${page}`
      );
      if (data) {
        const totalPages = Math.ceil(data.count / 4);
        dispatch(setTotalData(totalPages));
        dispatch(setBook(data.rows));
      }
    } catch (error) {
      console.log("errorAxios", error.message);
    }
  };

  return {
    // handlerFilter,
    handleUnchecked,
    handlerCheckbox,
    handlerSortChange,
    handlerSort,
    handlerClearFilters,
  };
}
