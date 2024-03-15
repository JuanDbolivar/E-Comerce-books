import axios from "axios";
import { url } from "../../values/values";
import { useDispatch, useSelector } from "react-redux";
import { setEnviado } from "../../redux/reducers/BookDetail/BookDetailSlice";

export function DetailHandler() {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.bookDetail);
  const { id } = useSelector((state) => state.user);

  const onSubmit = async (commentation) => {
    try {
      if (commentation) {
        const review = {
          commentations: commentation,
          book: detail.id,
          user_name: id,
        };
        const { data } = await axios.post(`${url}review/`, review);

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
