import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEnviado } from "../../redux/reducers/BookDetail/BookDetailSlice";

export function DetailHandler() {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.bookDetail);
  const { id } = useSelector((state) => state.user);


  const onSubmit = async (commentation) => {
    try {
      if (commentation) {
        const { data } = await axios.post(
          `http://localhost:8000/review/?book=${detail.id}&user=${id}`,
          commentation
        );

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
