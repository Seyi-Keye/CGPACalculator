const userLogin =  require('./userLogin.js')

function customRoutes(server) {
  // create user login custom route
  server.post('/api/v1/users/login', (req, res) => {
    userLogin(req, res);
  })
  return server;
}

module.exports = customRoutes;