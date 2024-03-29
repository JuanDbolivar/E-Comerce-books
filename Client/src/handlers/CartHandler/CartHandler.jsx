import axios from "axios";
import { url } from "../../values/values";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const { userBooks, id, email, purchased_books } = useSelector(
    (state) => state.user
  );
  const { userName, userEmail, booksName, userAddress } = useSelector(
    (state) => state.sendUser
  );

  const navigate = useNavigate();

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
    dispatch(unSetUserBooks()); //clear the cart
  };

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
      navigate("/payment");
    }
    if (id && email) {
      try {
        const userBooks = [...purchased_books];
        await axios.patch(`${url}user/${id}/`, {
          purchased_books,
        });
      } catch (error) {
        console.log("errorAxios", error.message);
      }
    }
  };

  return {
    putOrRemoveBookToCart,
    clearBookCart,
    removeBookFromCart,
    addBookToCart,
    checkBook,
  };
}

export default CartHandler;
