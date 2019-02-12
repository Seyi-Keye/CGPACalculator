const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const routes =  require('./routes.js')
const customRoutes = require('./customRoutes')

const port = parseInt(process.env.PORT, 10) || 3001;
console.log(middlewares)
server.use(middlewares)


// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser)

const customServer = customRoutes(server);

customServer.use((req, res, next) => {
  routes(req, res, next)
  next()
})

//or mount server on an endpoint
customServer.use('/api/v1', router)

// Use default router
customServer.use(router)
customServer.listen(port, () => {
  console.log('JSON Server is running on port', port)
})