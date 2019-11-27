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

//get user by id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//update user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const {first_name,last_name,email,password, age, bio, height, image_url, location, weight } = request.body;

  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, age = $5, bio = $6, height = $7, image_url = $8, location = $9, weight = $10 WHERE id = $11",
    [first_name,last_name,email,password, age, bio, height, image_url, location, weight, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
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
            const { first_name, last_name, email, password } = request.body;
            //problem with the tome jwt on first time signing in 
            const token = jwt.sign(
              { userID: 1 },
              process.env.SECRET
            );
            // console.log(request.body)
            pool.query(
              "INSERT INTO users (first_name,last_name, email,password) VALUES ($1, $2, $3, $4)",
              [first_name, last_name, email, password],
              (error, result) => {
                if (error) {
                  throw error;
                }
                // ${result.insertId}

                response
                  .status(201)
                  .send({ message: "Signup Successfully!!", token: token });
              }
            );
          }
        });
      } else {
        response.send({ message: "Email Aready in Use!!!" });
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
          const token = jwt.sign(
            { userID: result.rows[0].id },
            process.env.SECRET
          );
          response.status(200).json({
            message: "You are logged in!!",
            token: token
          });
        } else {
          response.send({ message: "Invalid Password" });
        }
      });
    } else {
      response.send({ message: "No email Found" });
    }

    // console.log('query return row : ',result.rowCount)
  });
};

const getUserInfo = (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  // extracting the payload  example {userId: 1}
  const payload = jwt.verify(token, process.env.SECRET);
  console.log(payload);
  // Make a query in the user db to retrieve that user
  console.log(payload.userID);
  // send back the user info to the client
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [payload.userID],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results.rows[0]);
    }
  );
};

module.exports = {
  getUserInfo,
  getUsers,
  addUser,
  loginUser,
  getUserById,
  updateUser
};

//FUNCTION
/* const getUserInfo = (email) => {
  pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
    if (error) {
      throw error;
    }
    return results.rows[0].id
   
  });
}; */
