const mongoose = require("mongoose");
const Book = require("../models/books");

const databaseName = "demomern";
let mongoConnect = `mongodb://127.0.0.1:27017/${databaseName}`;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    if (err) console.error(err);
  });

let db = mongoose.connection;

// db events
db.on("error", (error) => {
  console.error(error);
});

db.on("close", () => {
  console.info("Lost connection");
});
db.on("reconnect", () => {
  console.info("Reconnected");
});
db.on("connected", () => {
  console.info(
    `Connection is established with mongodb, details: ${mongoConnect}`
  );
});

db.on("disconnected", function () {
  console.info("Attempting to reconnect to MongoDB!");
  // Some duplication here, would be better to have in its own method
  mongoose.connect(mongoConnect, options).catch((err) => {
    if (err) console.error(err);
  });
});

const getBooks = function (req, res) {
  Book.find(function (err, todos) {
    if (err) {
      res.status(503).send(err);
    }
    res.json(todos);
  });
  // res.send("Get a random book");
};

const addBook = function (req, res) {
  console.log(req.body.bookName);
  const book = new Book({
    bookName: req.body.bookName,
  });
  book.save((err) => {
    console.log(err);
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "book successfully added!",
      });
    }
  });
  // res.send("Add a book");
};

const updateBook = function (req, res) {
  const bookName = req.body.bookName;
  const bookId = req.body.bookId

  Book.findByIdAndUpdate(
    bookId,
    {
      bookName : bookName
    },
    {
      safe: true,
      upsert: true,
      new: true,
    },
    function (err, raw) {
      if (err) {
        console.err(err);
        res.status(503).send(err);
      } else {
        res.json({
          message: `Updated book ${bookId}`,
        });
      }
    }
  );
};

const deleteBook = function(req,res){
  Book.remove({
    _id: req.body.bookId
  }, function(err, todo) {
    if (err) {
      res.status(503).send(err);
    }
    res.json({
      message: 'Book has been deleted'
    })
  });
}

module.exports = { getBooks, addBook, updateBook,deleteBook };
