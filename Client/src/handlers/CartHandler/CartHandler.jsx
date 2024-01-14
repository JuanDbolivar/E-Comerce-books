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
  const { totalUSD, userName, userEmail, booksName, userAddress } = useSelector(
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

    try {
      const Endpoint =
        "https://e-commerce-pf-henry.onrender.com/checkout/session";

      const amountInCents = Math.round(totalUSD * 100);
      const data = {
        productName: userBooks.map((book) => book.title).join(", "),
        unitAmount: amountInCents,
      };
      const response = await axios.post(Endpoint, data);

      if (response.data) {
        // const { data } = await axios.post(
        //   `https://e-commerce-pf-henry.onrender.com/send-email?userEmail=${userEmail}&totalUSD=${totalUSD}&booksName=${booksName}&userName=${userName}&userAddress=${userAddress}`
        // );
        // if (data) {
        // }
        dispatch(unSetSendUser());
        window.location.href = response.data;
      }
    } catch (error) {
      console.log(error);
    }
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
