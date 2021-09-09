const express = require("express");
const app = express();
var cors = require("cors");

const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(cors()); // yhden uuden header rivin

let db = [
  { id: 1, name: "jack" },
  { id: 2, name: "tiina" },
];
app.get("/customers", (req, res) => {
  res.send(db);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
