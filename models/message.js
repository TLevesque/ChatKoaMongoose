'use strict'

// const fs = require('fs');
// const path = require('path');
// const mysql      = require('mysql');
// const dbFilePath = './db.json';

const mongodb = require('mongodb');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/newdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Moogose connected!');
});

const msgSchema = mongoose.Schema({
    author: String,
    content: String,
    date: String,
});

const Message = mongoose.model('Message', msgSchema);

exports.getAll = function () {
  return Message.find();
};

exports.save = function (msg) {
    let newMsg = new Message(msg);
    newMsg.save(function (err) {
    if (err) return handleError(err);
    console.log('New messsage saved!');
  });
};
