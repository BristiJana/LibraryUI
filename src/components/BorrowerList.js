import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BorrowerList = () => {
  const [borrowers, setBorrowers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/borrowers')
      .then(response => setBorrowers(response.data))
      .catch(error => console.error('Error fetching borrowers:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/borrowers/${id}/`);
      setBorrowers(borrowers.filter(borrower => borrower.id !== id));
    } catch (error) {
      console.error('Error deleting borrower:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Borrower List</h2>
        <Link to="/borrowers/new" className="btn btn-primary">Add New Borrower</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.map(borrower => (
            <tr key={borrower.id}>
              <td><Link to={`/borrowers/${borrower.id}`}>{borrower.name}</Link></td>
              <td>{borrower.email}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(borrower.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowerList;
