const express = require("express");
const app = express();
var cors = require("cors");

const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(cors());

app.use(express.json());

let lastIndex = 1;

let db = [
  { id: lastIndex++, name: "jack" }, // 0
  { id: lastIndex++, name: "tiina" }, // 1
];

// GET http://localhost:8080/customers
app.get("/customers", (req, res) => {
  res.send(db);
});

// GET http://localhost:8080/customers/99
app.get("/customers/:myId([0-9]+)", (req, res) => {
  let id = req.params.myId;

  // etsi taulukosta henkilö joka id mätsää annetun kanssa
  let customer = db.find((customer) => customer.id == id);

  if (customer != null) {
    res.send(customer);
  } else {
    res.status(404).end();
  }
});

// DELETE http://localhost:8080/customers/99
app.delete("/customers/:myId([0-9]+)", (req, res) => {
  let id = req.params.myId;
  let newDB = db.filter((customer) => customer.id != id);
  if (newDB.length != db.length) {
    db = newDB;
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

// POST http://localhost:8080/customers/
app.post("/customers", (req, res) => {
  let body = req.body;
  body.id = lastIndex++;
  db.push(body);
  res.status(201).json(body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
