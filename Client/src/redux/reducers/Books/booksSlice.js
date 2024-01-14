import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  dataA: [],
  dataY: [],
  dataG: [],
  totalData: 1,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
    },
    setDataA: (state, action) => {
      state.dataA = action.payload;
    },
    setDataY: (state, action) => {
      state.dataY = action.payload;
    },
    setDataG: (state, action) => {
      state.dataG = action.payload;
    },
    setTotalData: (state, action) => {
      state.totalData = action.payload;
    },
  },
});

export const { setBook, setDataA, setDataY, setDataG, setTotalData } =
  bookSlice.actions;
export default bookSlice.reducer;
