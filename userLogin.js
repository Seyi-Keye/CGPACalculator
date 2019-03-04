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
  const username = req.body.username;
  const avatar = req.body.avatar;

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

        // user logged in with email and password
        if (user && user.length > 0 && password && password != undefined && bcrypt.compareSync(password, user[0].password)) {
          const token = generateToken(user[0]);
          return res.status(200).json({
            message: 'You are successfully Logged in',
            token
          });
        }

      // user found and user logged in via google
      else if (user && (user.length > 0) && (password == undefined)) {
        return res.status(200).json({
          message: 'You are successfully Logged in',
          user
        });
      }
      // user not found and user logged in via google
      // create user
      else if (user && (user.length === 0) && (password == undefined)) {
        Request.post({
          "headers": {
            "content-type": "application/json" },
          "url": `http://localhost:3001/api/v1/users`,
          "body": JSON.stringify({username, avatar, email})
      }, (error, response ) => {
          if(error) {
              return res.status(500).json({
                message: error.message
              });
          }
          return res.status(200).json({
            message: 'You are successfully Logged in',
            response
          });
      });
    }
         else {
          return res.status(404).json({
            message: 'Email or Password is incorrect'
          })
        }
  });
}

