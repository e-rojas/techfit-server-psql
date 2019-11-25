const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./queries");
const dbDrinks = require ("./drinksQueries")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//GET
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/api/users", db.getUsers);
app.get("/api/drinks", dbDrinks.getDrinks);
app.get("/api/drinks-tracking", dbDrinks.getDrinksTracking);
app.get("/api/drink-info/", dbDrinks.getDrinkInfo)

//POST
app.post("/api/users", db.addUser);
app.post('/api/login', db.loginUser);

// START SERVER
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening on port:3002`);
});
