import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Books</h5>
              <p className="card-text">Explore our collection of books.</p>
              <Link to="/books" className="btn btn-primary">View Books</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Borrowers</h5>
              <p className="card-text">See our list of borrowers.</p>
              <Link to="/borrowers" className="btn btn-primary">View Borrowers</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
