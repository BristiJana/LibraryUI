import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BorrowerDetails = () => {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/borrowers/${id}`)
      .then(response => { console.log(response.data); setBorrower(response.data) })
      .catch(error => console.error('Error fetching borrower:', error));
  }, [id]);

  if (!borrower) return <div>Loading...</div>;

  const handleUpdate = async (id) => {
    navigate(`/borrowers/new/${id}`);
  };

  const handleBorrowBooks = async (id) => {
    navigate(`/borrowers/borrow/${id}`);
  };

  const handleReturnBook = async (bookId) => {
    try {
      await axios.post(`http://localhost:8000/api/return/`, { borrower_id: id, book_id: bookId });
      const response = await axios.get(`http://localhost:8000/api/borrowers/${id}/`);
      setBorrower(response.data);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Borrower Details</h2>
      <p><strong>Name:</strong> {borrower.name}</p>
      <p><strong>Email:</strong> {borrower.email}</p>
      <div>
        <h3>Borrowed Books</h3>
        {borrower.borrowed_books.length > 0 ? (
          <ul className="list-group">
            {borrower.borrowed_books.map(book => (
              <li key={book} className="list-group-item">
                {book}
                <button className="btn btn-danger ml-2" onClick={() => handleReturnBook(book)}>Return Book</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books borrowed.</p>
        )}
      </div>
      <button className="btn btn-primary mt-3" onClick={() => handleUpdate(borrower.id)}>Update</button>
      <button className="btn btn-success ms-2 mt-3" onClick={() => handleBorrowBooks(borrower.id)}>Borrow Books</button>
    </div>
  );
};

export default BorrowerDetails;
