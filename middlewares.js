app.use('/api/user', function (req, res, next) {
  console.log('Request Type:', req)
  next()
})