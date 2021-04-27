import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './components/Title'
import BookList from './components/BookList'

const API_URL = 'http://localhost:3001/books';
function App() {
  const [data, setData] = useState([]);

  const getBooks = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((books) => setData(books));
  };
  // Run effect on componentDidMount
  useEffect(() => { getBooks(); }, []);

  return (
    <div className="container">
     <Title title="books" count={data.length} />
     <BookList list={data}  />
    </div>
  );
}

export default App;
