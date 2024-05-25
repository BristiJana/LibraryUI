import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import BookForm from './components/BookForm';
import BorrowerList from './components/BorrowerList';
import BorrowerDetails from './components/BorrowerDetails';
import BorrowerForm from './components/BorrowerForm';
import BorrowBook from './components/BorrowBook';
import Home from './components/Home';

const App = () => (
  <Router>
    <div>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/books" element={<BookList/>} />
        <Route path="/books/new" element={<BookForm/>} />
        <Route path="/books/new/:id" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetails/>} />
        <Route path="/borrowers" element={<BorrowerList/>} />
        <Route path="/borrowers/new" element={<BorrowerForm/>} />
        <Route path="/borrowers/new/:id" element={<BorrowerForm/>} />
        <Route path="/borrowers/:id" element={<BorrowerDetails/>} />
        <Route path="/borrowers/borrow/:id" element={<BorrowBook/>} />
      </Routes>
    </div>
  </Router>
);

export default App;

