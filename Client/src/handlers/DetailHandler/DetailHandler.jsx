import axios from "axios";
import { url } from "../../values/values";
import { useDispatch, useSelector } from "react-redux";
import { setEnviado } from "../../redux/reducers/BookDetail/BookDetailSlice";

export function DetailHandler() {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.bookDetail);
  const { name } = useSelector((state) => state.user);

  const onSubmit = async (commentation) => {
    try {
      if (commentation && detail.id > 0 && name) {
        const review = {
          commentations: commentation.commentation,
          book: detail.id,
          book_id: detail.id,
          user_name: name,
        };
        console.log("review", review);
        const { data } = await axios.post(`${url}review/`, {
          commentations: commentation.commentation,
          book: detail.id,
          book_id: detail.id,
          user_name: name,
        });

        if (data) {
          dispatch(setEnviado(true));
        }
      }
    } catch (error) {
      console.log("errorAxios", error.message);
    }
  };

  return { onSubmit };
}
