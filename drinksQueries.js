const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./config");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

//GET DRINKS
const getDrinks = (request, response) => {
  pool.query(
    `SELECT * FROM drinks`
  )
  .then((data) => {
    response
      .status(200)
      .json({message: 'success', ...data.rows});
  })
  .catch((error) => {
    console.log(error);
  });
};

//GET DRINKS TRACKING
const getDrinksTracking = (request, response) => {
  pool.query(
    `SELECT * FROM drinks_tracking`
  )
  .then((data) => {
    response
      .status(200)  
      .json({message: 'success', ...data.rows});
  })
  .catch((error) => {
    console.log(error);
  });
};

module.exports = {
  getDrinks,
  getDrinksTracking
}