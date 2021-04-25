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
  res.send("Get a random book");
};

const addBook = function (req, res) {
  console.log(req.body.nombre);
  const book = new Book({
    bookName: req.body.nombre,
  });
  book.save((err) => {
    console.log(err);
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: 'Todo successfully added!'
      });
    }
  });
  res.send("Add a book");
};

const updateBook = function (req, res) {
  res.send("Update the book");
};

module.exports = { getBooks, addBook, updateBook };
