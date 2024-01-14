import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditForm from '../EditForm/EditForm'
import style from './BooksList.module.css'

const BooksList = () => {
  
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData,setTotalData]=useState(1)
 
  const [selectedBook, setSelectedBook] = useState(null);
  

  const handlePaginaAnterior = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
    }
  };

  const handlePaginaSiguiente = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
  };

  const handleEditFormClose = () => {
    setSelectedBook(null);
  };
  const handleToggleActive = async (book) => {
    // Cambiar el estado local
    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...b, active: !b.active } : b
    );
    setBooks(updatedBooks);
  
    

    // Hacer la solicitud PUT para actualizar el estado en el servidor
    try {
      await axios.put(
        `https://e-commerce-pf-henry.onrender.com/book/update/${book.id}`,
        updatedBooks.find((b) => b.id === book.id)
      );
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://e-commerce-pf-henry.onrender.com/book?page=${page}`);
        if(response){
          const totalPages = Math.ceil(response.data.count / 4);
            setTotalData(totalPages);
            setBooks(response.data.rows);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <h2 >Lista de Libros</h2>
      <table className="table is-fullwidth is-bordered">
        {/* Encabezado de la tabla */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Precio</th>
            <th>Paginas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.pages}</td>
              <td>{book.active ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button
                  className="button is-primary is-small"
                  onClick={() => handleEditClick(book)}
                >
                  Editar
                </button>
                <button className="button is-danger is-small"  onClick={() => handleToggleActive(book)}>Cambiar Estado</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div>
        <button
          onClick={handlePaginaAnterior}
          disabled={page === 1}
          className="orderButton"
        >
           Anterior
        </button>
        <span className="button is-static">
          {page} de {totalData}
        </span>
        <button
          onClick={handlePaginaSiguiente}
          disabled={page >= totalData ? true : false}
          className="orderButton"
        >
         Siguiente
        </button>
      </div>

      {/* EditFormModal */}
      {selectedBook && (
        <EditForm
          isOpen={!!selectedBook}
          onClose={handleEditFormClose}
          book={selectedBook}
          onUpdate={(updatedBook) => {
            // Actualizar el estado local con el libro actualizado
            setBooks((prevBooks) =>
              prevBooks.map((prevBook) =>
                prevBook.id === updatedBook.id ? updatedBook : prevBook
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default BooksList;