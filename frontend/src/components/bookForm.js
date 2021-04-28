import React, { useState } from 'react';


const BookForm = ({ addBook }) => {
  // input state using react-hooks
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = inputValue.trim();
    if (data !== '') {
        addBook(inputValue);
      setInputValue('');
    }
  };

  return (
    <form  onSubmit={handleSubmit} >
      <input name="book" type="text"
        onChange={handleChange}
        value={inputValue}
        placeholder="Book Name"
      />
      <input type="submit" value="Add new Book" />
    </form>
  );
};

export default BookForm;
