const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./queries");
const dbDrinks = require ("./drinksQueries")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

//DRINKS DATA
app.get("/api/drinks-tracking", (req, res) => {
  dbDrinks.getDrinksTracking(req, res);
});
app.post("/api/drinks-tracking", (req, res) => {
  dbDrinks.putDrinkCounts(req, res);
});

app.get('/api/user-info',db.getUserInfo)
app.get("/api/users", db.getUsers);
// app.get("/api/drinks", dbDrinks.getDrinks);
// app.get("/api/drinks-tracking", dbDrinks.getDrinksTracking);
// app.get("/api/drink-info/", dbDrinks.getDrinkInfo)

//USERS
app.get("/api/users", db.getUsers);
app.get('/users/:id', db.getUserById);
app.post("/api/users", db.addUser);
app.post('/api/login', db.loginUser)
app.get('api/users/:id', db.getUserById)
app.put('/users/:id', db.updateUser)

//START SERVER
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening on port:3002`);
});
