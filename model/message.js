// 
// const fs = require('fs');
// const path = require('path');
//
// const dbFilePath = './db.json';
//
// const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
//
// setInterval(function () {
//   fs.writeFile(dbFilePath, JSON.stringify(db), function () {});
// }, 5000);
//
// exports.getAll = function () {
//   return JSON.parse(fs.readFileSync(dbFilePath, 'utf8')).msgs;
// };
//
// exports.save = function (msg) {
//   db.msgs.push(msg);
//   return true;
// };
