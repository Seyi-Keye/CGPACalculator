var bcrypt = require("bcrypt");
var dotenv = require("dotenv");
var Request = require("request");
const { generateToken } =  require('./authenticate.js')

dotenv.config();


/*
   * userLogin is the userLogin controller
   * @param req and res
   * @returns {Object} res
*/
module.exports = function userLogin(req,res) {
  const email = req.body.email;
  const password = req.body.password;

  // find the user by email
    Request.get({
      "headers": { "content-type": "application/json" },
      "url": `http://localhost:3001/api/v1/users?email=${email}`
  }, (error, response, ) => {
      if(error) {
          return res.status(500).json({
            message: error.message
          });
      }

      const user = JSON.parse(response.body);
      if(user && user.length != 0 && bcrypt.compareSync(password, user[0].password)) {
        const token = generateToken(user[0]);
        return res.status(200).json({
          message: 'You are successfully Logged in',
          token
        })
      }
      else {
        return res.status(404).json({
          message: 'Email or Password is incorrect'
        })
      }
  });
}

