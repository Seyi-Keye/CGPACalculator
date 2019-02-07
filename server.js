const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const port = parseInt(process.env.PORT, 10) || 3001;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('*', (req, res) => {
  res.send('Welcome to Xhibit')
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
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