'use strict';

const app = require('koa')();
const fs = require('fs');

const send = require('koa-send');
const http = require('http');
const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const handlebars = require('handlebars');

const router = require('./router.js');

//Serve files from static repo
app.use(bodyParser());

//Define access to 404 page
const notFound = fs.readFileSync('./static/404.html', 'utf8');

//Access router
app.use(router.routes());

//Serve static files:
app.use(serve('./static'));

//404 redirection:
app.use(function* (next) {
  if (this.status === 404) this.body = notFound;
});

//Error handling:
app.on('error', function (err, ctx) {
  console.error('server error', err, ctx);
});

app.use(router.allowedMethods());

// Socket.io
var server = http.Server(app.callback());
var io = require('socket.io')(server);

// io.on('connection', function (socket) {
//   socket.on('click', function (data) {
//     //process the data here
//     console.log('client clicked SEND!:');
//     console.log(data);
//
//     // emit an event
//     console.log('responding with news');
//     socket.emit('news', { hello: 'world' });
//   });
// });

io.on('connection', function (socket) {
  console.log('Client connected');
  socket.on('new message', function (data) {
      //process the data here
      console.log('client clicked SEND!');
      // io.emit('chat message', data);
      socket.broadcast.emit('chat message', data);
  });
});

server.listen(3000, function () {
  console.log('Socket server listening...');
});
