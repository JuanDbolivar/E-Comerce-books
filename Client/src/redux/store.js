import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookReducer from "./reducers/Books/booksSlice";
import bookDetailReducer from "./reducers/BookDetail/BookDetailSlice";
import bookFilterReducer from "./reducers/BookFilter/BookFilterSlice";
import userReducer from "./reducers/Users/UserSlice";
import sendUserReducer from "./reducers/SendUser/sendUserSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "sendUser"],
};

const rootReducer = combineReducers({
  book: bookReducer,
  bookDetail: bookDetailReducer,
  bookFilter: bookFilterReducer,
  user: userReducer,
  sendUser: sendUserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  // book: bookReducer,
  // bookDetail: bookDetailReducer,
  // bookFilter: bookFilterReducer,
  // user: userReducer,
  // },
});

export const persistor = persistStore(store);
