'use strict'

const koa = require('koa');
const router = require('koa-router')();
const http = require('http');
const path = require('path');
const fs = require('fs');
const send = require('koa-send');
const bodyParser = require('koa-bodyparser');
const msg = require('./controllers/cmessage.js');

// Retrieve messages from db.json
router.get('/messages', msg.get);
router.post('/messages', msg.post);

module.exports = router;
