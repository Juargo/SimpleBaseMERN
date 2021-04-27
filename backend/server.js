const express = require("express");
const bookRoutes = require("./routes/book-routes");
const app = express();
const cors = require('cors');
const port = 3001;


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cors())
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
