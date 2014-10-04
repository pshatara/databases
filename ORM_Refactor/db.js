var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "KevinPeter", "puppies4lyfe");

var User = sequelize.define('User', {
  username: {type: Sequelize.STRING, primaryKey: true}
});

var Message = sequelize.define('Message' {
  messageText: {type: Sequelize.STRING, primaryKey: true}
  roomName: Sequelize.STRING
});

Message.belongsTo(User);

exports.findAllMessages = function(cb){
  var getDataQuery = 'SELECT * FROM messages INNER JOIN users ON users.id = messages.userId';
  dbConnection.query(getDataQuery, [], function(err, results){
    cb(err, results);
  });
};

exports.findUser = function(username, cb){
  dbConnection.query('SELECT * FROM users WHERE userName = ?', [username], function(err, rows){
    cb(err, rows);
  });
};

exports.saveUser = function(username, cb){
  // User.save().success(function() {

  // });

  dbConnection.query('INSERT INTO users (userName) VALUES (?);', [username], function(err, results){
    cb(results);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  Message.save({messageText: message, roomName: roomname}).success(function() {
    console.log("message saved.");
    Message.addUser(userid);
    cb();
  })
  Message.save().failure(function(error){
    if(err){throw err;}
  })

  // dbConnection.query('INSERT INTO messages (messageText, userId, roomName) VALUES ( ?, ?, ?);', [message, userid, roomname], function(err, results) {
  //   if (err) { throw err; }
  //   console.log("Message saved.");
  //   cb();
  // });
};
