import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: "",
  year: "",
  gender: "",
  filters: [],
  value: "",
  page: 1,
};

export const bookFilterSlice = createSlice({
  name: "bookFilter",
  initialState,
  reducers: {
    setBookAuthor: (state, action) => {
      state.author = action.payload.author;
    },
    setBookAño: (state, action) => {
      state.year = action.payload.year;
    },
    setBookGenero: (state, action) => {
      state.gender = action.payload.gender;
    },
    setBookFilters: (state, action) => {
      state.filters = [...state.filters, action.payload.filters];
    },
    unSetBookFilters: (state, action) => {
      state.filters = action.payload.filters;
    },
    setBookValue: (state, action) => {
      state.value = action.payload.value;
    },
    setBookPage: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

export const {
  setBookAuthor,
  setBookAño,
  setBookGenero,
  setBookFilters,
  unSetBookFilters,
  setBookValue,
  setBookPage,
} = bookFilterSlice.actions;
export default bookFilterSlice.reducer;
