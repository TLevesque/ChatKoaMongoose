
const message = require('../models/message.js');

exports.get = function* () {
  this.body = message.getAll();
};

exports.post = function* () {
  message.save(this.request.body);
  this.status = 200;
};
