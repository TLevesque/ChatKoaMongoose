'use strict';

const app = require('koa')();
const fs = require('fs');

const send = require('koa-send');
const http = require('http');
const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const router = require('./router.js');

//Define access to 404 page
const notFound = fs.readFileSync('./static/404.html', 'utf8');


//Serve files from static repo
app.use(bodyParser());

//Access router
app.use(router.routes());

//Serve static files:
app.use(serve('./static'));

//404 redirection:
app.use(function* (next) {
  if (this.status === 404) this.body = notFound;
});

//Error handling:
app.on('error', function(err, ctx) {
  console.error('server error', err, ctx);
});

app.use(router.allowedMethods());

app.listen(3000);
