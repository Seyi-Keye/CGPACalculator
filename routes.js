const UserController = require('./UserController');

const userController = new UserController();

// Intercepting routes
module.exports = function routes(req,res, next) {
  if (req.method === 'POST') {
    switch (req.url) {
      case '/api/v1/users':
      userController.modifyCreateUser(req);
        break;

      default:
        break;
    }
  }
  // else if (req.method === 'GET') {
  // }

}
