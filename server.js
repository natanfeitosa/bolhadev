const { join } = require('path')
const { createServer } = require('http')
const express = require('express')
const { Server } = require('socket.io')
const logger = require('morgan')

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')));

module.exports = {
  app,
  server,
  io
}