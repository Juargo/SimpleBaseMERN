const mongoose = require('mongoose');
 
const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);
 
const Book = mongoose.model('Book', bookSchema);
 
module.exports= Book;