const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static("public"));

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
