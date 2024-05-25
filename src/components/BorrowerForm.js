import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BorrowerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      if (id) {
        url = `http://localhost:8000/api/borrowers/${id}/`;
        await axios.put(url, form);
      } else {
        url = `http://localhost:8000/api/borrowers/`;
        await axios.post(url, form);
      }
      navigate('/borrowers');
    } catch (error) {
      console.error('Error saving borrower:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Update Borrower' : 'Add New Borrower'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-4">{id ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
};

export default BorrowerForm;
