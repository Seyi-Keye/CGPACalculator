const {generateToken, hashPassword} =  require('./authenticate.js');

class UserController {
   modifyCreateUser (req) {
    req.body.roleId = 2;
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    if(req.body.password != undefined){
      req.body.password = hashPassword(req.body.password)
    }
    const token = generateToken(req.body);
    req.body.token = token;
  }
}

module.exports = UserController;