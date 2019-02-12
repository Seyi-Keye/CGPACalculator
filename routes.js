// checks the url and redirects to accurate middleware
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
  }
}
