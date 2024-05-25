import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const BorrowBook = () => {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/borrowers/${id}`)
      .then(response => setBorrower(response.data))
      .catch(error => console.error('Error fetching borrower:', error));
    
    axios.get('http://localhost:8000/api/books/')
      .then(response => {
        const availableBooks = response.data.filter(book => book.available);
        setBooks(availableBooks);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, [id]);

  const handleBookChange = selectedOptions => {
    setSelectedBooks(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookIds = selectedBooks.map(book => book.value);
    try {
      await axios.post('http://localhost:8000/api/borrow/', {
        borrower_id: id,
        book_ids: bookIds
      });
      alert('Books borrowed successfully!');
      navigate('/borrowers');
    } catch (error) {
      console.error('Error borrowing books:', error);
    }
  };

  if (!borrower) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Borrow Books for {borrower.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Books</label>
          <Select
            isMulti
            name="books"
            options={books.map(book => ({ value: book.id, label: book.title }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleBookChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Save</button>
      </form>
    </div>
  );
};

export default BorrowBook;
