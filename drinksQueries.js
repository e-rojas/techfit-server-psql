const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./config");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

//GET DRINKS TRACKING
const getDrinksTracking = (req, res) => {
  pool.query(`
    SELECT dt.*, calendar.* 
    FROM drinks_tracking dt
    INNER JOIN calendar ON dt.id = calendar.id
    INNER JOIN users ON dt.user_id = users.id
    LIMIT 7;
  `)
  .then((data) => {
    console.log(data.rows)
    res
      .status(200)
      .json({message: 'success', ...data.rows});
  })
  .catch((error) => {
    console.log(error);
  });
};

//PUT NEW DATA IN THE COUNTS
const putDrinkCounts = (req, res) => {
  console.log('changed drink count!')
  res.status(200);
  //destructure necessary params from req.param
  //use them in query
  //const [drinkType]
  // pool.query(`
  //   UPDATE drinks-tracking
  //   SET
  //   $1
  // `, [1]) 
  // res.json({message: 'drink count changed!'})
}

module.exports = {
  getDrinksTracking,
  putDrinkCounts
}