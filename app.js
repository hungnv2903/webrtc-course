const express = require('express');

const path = require('path');

const {Server} = require('socket.io');

const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => console.log('a user connected'));

server.listen(3000);