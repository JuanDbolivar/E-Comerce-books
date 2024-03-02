import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  banned: false,
  userBooks: [],
  totalBooks: 0,
  purchased_books: [],
  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.banned = action.payload.banned;
    },

    setIdBooks: (state, action) => {
      state.purchased_books = action.payload.purchased_books;
      // const newIdBooks = action.payload.purchased_books;
      // const uniqueNewIdBooks = newIdBooks.filter(
      //   (id) => !state.purchased_books.includes(id)
      // );

      // state.purchased_books = [...state.purchased_books, ...uniqueNewIdBooks];
    },

    setUserBooks: (state, action) => {
      const { book } = action.payload;
      const existingBook = state.userBooks.find((b) => b.id === book.id);

      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.userBooks.push({ ...book, quantity: 1 });
      }

      state.totalBooks += 1;
    },

    removeUserBooks: (state, action) => {
      const bookId = action.payload;

      state.totalBooks -= 1;
      state.userBooks = state.userBooks.filter((book) => book.id !== bookId);
    },

    updateUserBooks: (state, action) => {
      const { book } = action.payload;
      const existingBookIndex = state.userBooks.findIndex(
        (b) => b.id === book.id
      );

      if (existingBookIndex !== -1) {
        const existingBook = state.userBooks[existingBookIndex];

        existingBook.quantity -= 1;
        if (existingBook.quantity === 0) {
          state.userBooks.splice(existingBookIndex, 1);
        }

        state.totalBooks -= 1;
      }
    },

    //borrar carrito
    unSetUserBooks: (state) => {
      state.userBooks = [];
      state.totalBooks = 0;
      state.purchased_books = [];
    },

    // este se utliza en el logout
    unSetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.banned = false;
      state.purchased_books = [];
      state.userBooks = [];
      state.totalBooks = 0;
    },
  },
});

export const {
  setUser,
  setIdBooks,
  setUserBooks,
  unSetUserBooks,
  removeUserBooks,
  updateUserBooks,
  unSetUser,
} = userSlice.actions;

export default userSlice.reducer;
