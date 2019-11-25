const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./config");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

//Get all users
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
// Add user
const addUser = (request, response) => {
  // console.log("requested email", request.body.email);
  //---------
  pool.query(
    `SELECT * FROM users WHERE email='${request.body.email}'`,
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount === 0) {
        bcrypt.hash(request.body.password, 10, (err, encrypted) => {
          if (err) {
            response.status(300).send("Error", err);
          } else {
            request.body.password = encrypted;
            const { first_name,last_name, email, password } = request.body;
               // console.log(request.body)
            pool.query(
              "INSERT INTO users (first_name,last_name, email,password) VALUES ($1, $2, $3, $4)",
              [first_name,last_name, email, password],
              (error, result) => {
                if (error) {
                  throw error;
                }
                // ${result.insertId}

                response.status(201).send(`Signup Successfully!! `);
              }
            );
          }
        });
      } else {
        response.send("Email Aready in Use!!!");
      }
      // console.log('query return row : ',result.rowCount)
    }
  );
};
//Login user
const loginUser = (request, response) => {
    const { email, password } = request.body;
    //---------
    pool.query(`SELECT * FROM users WHERE email=$1`, [email], (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount === 1) {
        // console.log(result.rows[0].password)
        bcrypt.compare(password, result.rows[0].password, (err, match) => {
          if (match) {
            var token = jwt.sign({ foo: "bar" }, process.env.SECRET);
            response.status(200).json({
              message: "You are logged in!!",
              token: token
            });
           
          }  else {
            response.send({message:"Invalid Password"});
          } 
        });
      } else {
        response.send({message:"No email Found"});
      }
  
      // console.log('query return row : ',result.rowCount)
    }); 
};
  
module.exports = {
  getUsers,
    addUser,
  loginUser
};
