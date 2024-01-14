import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: [],
  commentations: [],
  enviado: false,
};

export const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    setBookDetail: (state, action) => {
      state.detail = action.payload;
    },
    setCommentations: (state, action) => {
      state.commentations = action.payload;
    },
    setEnviado: (state, action) => {
      state.enviado = action.payload;
    },
  },
});

export const { setBookDetail, setCommentations, setEnviado } =
  bookDetailSlice.actions;
export default bookDetailSlice.reducer;
