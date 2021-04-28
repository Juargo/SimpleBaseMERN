import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './components/Title'
import BookList from './components/BookList'
import BookForm from './components/BookForm'

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

  const addBook = (name) => {
    fetch(
      API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookName: name
        })
      }
    )
    .then((response) => response.json())
    .then(() => getBooks())
    .catch((err) => {
      console.log(err);
    });
  };

  const removeBook = (id) => {
    fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookName: id
        })
      })
      .then((response) => response.json())
      .then(() => {
        const remainder = data.filter(book => book._id !== id);
        setData(remainder);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
     <Title title="books" count={data.length} />
     <BookForm addBook={addBook} />
     <BookList list={data}  removeBook={removeBook} />
    </div>
  );
}

export default App;
