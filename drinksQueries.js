const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./config");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

//GET DRINKS
const getDrinks = (req, res) => {
  pool.query(
    `SELECT * FROM drinks`
  )
  .then((data) => {
    res
      .status(200)
      .json({message: 'success', ...data.rows});
  })
  .catch((error) => {
    console.log(error);
  });
};

//GET DRINKS TRACKING
const getDrinksTracking = (req, res) => {
  pool.query(
    `SELECT * FROM drinks_tracking`
  )
  .then((data) => {
    res
      .status(200)  
      .json({message: 'success', ...data.rows});
  })
  .catch((error) => {
    console.log(error);
  });
};

const getDrinkInfo = (req, res) => {
  pool.query(
    `SELECT * FROM drink_info WHERE name=$1`, [req.query.name]
  )
  .then((data) => {
    res
      .status(200)
      .json({message: 'success', ...data.rows})
  })
  .catch((error) => {
    console.log(error);
  });
};

module.exports = {
  getDrinks,
  getDrinksTracking,
  getDrinkInfo
}