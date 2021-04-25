var express = require("express");
const {
  getBooks,
  addBook,
  updateBook,
} = require("../controllers/bookController");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
router.route("/").get(getBooks).post(addBook).put(updateBook);

module.exports = router;
