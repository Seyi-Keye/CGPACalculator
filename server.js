const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const routes =  require('./routes.js')
const userLogin =  require('./userLogin.js')

const port = parseInt(process.env.PORT, 10) || 3001;

server.use(middlewares)


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// // Add custom routes before JSON Server router

// create user login route
server.post('/api/v1/users/login', (req, res) => {
  userLogin(req, res);
  // res.send('Welcome to Xhibit')
})

server.use((req, res, next) => {
  console.log(req.url)
  routes(req, res)
//   // if (req.method === 'POST') {
//   //   req.body.createdAt = Date.now()
//   // }
//   // Continue to JSON Server router
  next()
})

// rewrite routes like in a routes file
// server.use(jsonServer.rewriter({
//   "/api/v1/users": "/users",
//   "/api/v1/roles": "/roles"
// }))
//or mount server on an endpoint
server.use('/api/v1', router)

// Use default router
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port', port)
})