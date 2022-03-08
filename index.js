const {
  server,
  io
} = require('./server')

require('./tweet').initiate(io)

let PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('listing on port:', PORT)
})
