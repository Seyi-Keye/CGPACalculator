// checks the url and redirects to accurate middleware
var Request = require("request");
const userLogin =  require('./userLogin.js')
const {generateToken, hashPassword} =  require('./authenticate.js')

// users routes
module.exports = function routes(req,res) {
  if(req.url === '/api/v1/users' && req.method === 'POST') {
    req.body.roleId = 2;
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    req.body.password = hashPassword(req.body.password)
    const token = generateToken(req.body);
    req.body.token = token;
;    // console.log('000000', res.body)
  //   const requestEmail = req.body.email;
  //   Request.get({
  //     "headers": { "content-type": "application/json" },
  //     "url": `http://localhost:3001/api/v1/users?email=${requestEmail}`
  // }, (error, response, ) => {
  //     if(error) {
  //         return console.log('Error', error);
  //     }
  //     console.log(response.body);
  // });
    // fetch(`http://localhost:3001/api/v1/users?email=${requestEmail}`)
    // .then(user => {
    //   console.log('got hererere', user)
    //   if(user && user.length) {
    //     console.log('user found', user);
    //     return res.status(200).json({
    //       message: 'welcome user'
    //     })
    //   }
    //    return res.status(404).json({message: 'user not found'})
    // })
  }
}
