import React from 'react';
import  "./Book.scss";

const Book = ({ book, remove }) => {
  console.log(book)
  return (
    <li className=''>
      {book.bookName}
      <span className='' onClick={remove}>
        <span>X</span>
      </span>
    </li>
  );
};

export default Book;
