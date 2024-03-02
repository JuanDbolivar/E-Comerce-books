import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setSendUser,
  unSetSendUser,
} from "../../redux/reducers/SendUser/sendUserSlice";
import {
  setUserBooks,
  unSetUserBooks,
  removeUserBooks,
  updateUserBooks,
} from "../../redux/reducers/Users/UserSlice";

function CartHandler() {
  const dispatch = useDispatch();
  const { userBooks, id, email, idBooks } = useSelector((state) => state.user);
  const {  userName, userEmail, booksName, userAddress } = useSelector(
    (state) => state.sendUser
  );

  const books = useSelector((state) => state.book.books);

  const putOrRemoveBookToCart = (id) => {
    const book = books.find((book) => book.id === id);
    if (userBooks.find((b) => b.id === id)) {
      dispatch(removeUserBooks(id));
    } else {
      dispatch(setUserBooks({ book }));
    }
  };

  const addBookToCart = (id) => {
    const book = userBooks.find((book) => book.id === id);
    if (book) {
      dispatch(setUserBooks({ book }));
    }
  };

  const removeBookFromCart = (id) => {
    const book = userBooks.find((book) => book.id === id);
    if (book) {
      dispatch(updateUserBooks({ book }));
    }
  };

  const clearBookCart = () => {
    dispatch(unSetUserBooks());
  };

  const buyBooks = async () => {};

  const checkBook = async (userData) => {
    if (userData) {
      const userName = userData.name;
      const userEmail = userData.email;
      const userAddress = userData.address;
      const booksName = userBooks.map((book) => book.title).join(", ");
      const userPhone = userData.phone;

      dispatch(
        setSendUser({ userName, userEmail, userAddress, booksName, userPhone })
      );
    }
    if (id && email) {
      try {
        await axios.put(
          `https://e-commerce-pf-henry.onrender.com/user/update?userId=${id}`,
          { idBooks }
        );
      } catch (error) {
        console.log("errorAxios", error.message);
      }
    }
    dispatch(unSetUserBooks());
  };

  return {
    putOrRemoveBookToCart,
    clearBookCart,
    removeBookFromCart,
    addBookToCart,
    buyBooks,
    checkBook,
  };
}

export default CartHandler;
