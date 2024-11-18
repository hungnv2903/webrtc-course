const fs = require('fs');

const express = require('express');

const path = require('path');

const {Server} = require('socket.io');

const https = require('https');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const key = fs.readFileSync('cert.key');
const cert = fs.readFileSync('cert.crt');

const server = https.createServer({key, cert}, app);

const io = new Server(server);

server.listen(3000);

io.on('connection', socket => {
    console.log('Someone connected');
})