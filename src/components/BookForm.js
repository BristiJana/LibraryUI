import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', isbn: '', publication_date: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      if (id) {
        url = `http://localhost:8000/api/books/${id}/`;
        await axios.put(url, form);
      } else {
        url = `http://localhost:8000/api/books/`;
        await axios.post(url, form);
      }
      navigate('/books');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Update Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" className="form-control" id="author" name="author" value={form.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">ISBN</label>
          <input type="text" className="form-control" id="isbn" name="isbn" value={form.isbn} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="publication_date" className="form-label">Publication Date</label>
          <input type="date" className="form-control" id="publication_date" name="publication_date" value={form.publication_date} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default BookForm;
