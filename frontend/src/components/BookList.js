import React from 'react';
import Book from "./Book";

const BookList = ({ list, removeBook }) => {
  return (
    <ul className='Booklist'>
      {list.map((item) => {
        return (
          <Book 
            book={item}
            remove={() => {removeBook(item._id)}}
            // key={item._id}
          />
        )
      })}
    </ul>
  );
}

export default BookList;
