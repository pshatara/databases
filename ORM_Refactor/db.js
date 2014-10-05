var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "KevinPeter", "puppies4lyfe");

var User = sequelize.define('User', {
  username: {type: Sequelize.STRING, primaryKey: true}
  userId: Sequelize.INTEGER
});

var Message = sequelize.define('Message', {
  messageText: {type: Sequelize.STRING, primaryKey: true},
  roomName: Sequelize.STRING,
});

Message.sync();
User.sync();
Message.belongsTo(user);

exports.findAllMessages = function(cb){
  Message.findAll().success(function(result){
    cb(err, result);
  })
};

exports.findUser = function(username, cb){
  User.find({where: {userName: username}}).success(function(result){
    cb(err, result);
  })
};

exports.saveUser = function(username, cb){
  User.create({userName: username}).success(function(results) {
    cb(results);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  Message.save({messageText: message, roomName: roomname, userId: userid}).success(function() {
    cb();
  })

  // dbConnection.query('INSERT INTO messages (messageText, userId, roomName) VALUES ( ?, ?, ?);', [message, userid, roomname], function(err, results) {
  //   if (err) { throw err; }
  //   console.log("Message saved.");
  //   cb();
  // });
};

