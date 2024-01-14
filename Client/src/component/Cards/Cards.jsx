import CardBook from "../Card/Card";
import { useSelector } from "react-redux";

function Cards() {
  const books = useSelector((state) => state.book.books);

  return (
    <>
      {books.map((book) => (
        <CardBook key={book.id} book={book} />
      ))}
    </>
  );
}

export default Cards;
