import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  userAddress: "",
  booksName: "",
  userPhone: "",
  totalUSD: 0,
};

export const sendUserSlice = createSlice({
  name: "sendUser",
  initialState,
  reducers: {
    setSendUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userAddress = action.payload.userAddress;
      state.booksName = action.payload.booksName;
      state.userPhone = action.payload.userPhone;
    },

    setTotalUSD: (state, action) => {
      state.totalUSD = action.payload;
    },
    unSetSendUser: (state) => {
      state.userName = "";
      state.userEmail = "";
      state.userAddress = "";
      state.booksName = "";
      state.userPhone = "";
    },
  },
});

export const { setSendUser, setTotalUSD, unSetSendUser } =
  sendUserSlice.actions;

export default sendUserSlice.reducer;
