const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./queries");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/api/users", db.getUsers);
app.post("/api/users", db.addUser);
app.post('/api/login', db.loginUser)
// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening on port:3002`);
});
