const {
  server,
  io
} = require('./server')

require('./tweet').initiate(io)

let port = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('listing on port:', PORT)
})
