import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  const handleUpdate = async (id) => {
    navigate(`/books/new/${id}`);
  };

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${id}/`);
        console.log('Book:', response.data);
        setBook(response.data)
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    getBook()
  }, []);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Details</h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text"><strong>Title:</strong> {book.title}</p>
          <p className="card-text"><strong>Author:</strong> {book.author}</p>
          <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
          <p className="card-text"><strong>Publication Date:</strong> {book.publication_date}</p>
          <button onClick={() => handleUpdate(book.id)} className="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
