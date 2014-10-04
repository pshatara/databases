var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "KevinPeter",
  password: "puppies4lyfe",
  database: "chat"
});

dbConnection.connect();

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
  dbConnection.query('INSERT INTO users (userName) VALUES (?);', [username], function(err, results){
    cb(results);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query('INSERT INTO messages (messageText, userId, roomName) VALUES ( ?, ?, ?);', [message, userid, roomname], function(err, results) {
    if (err) { throw err; }
    console.log("Message saved.");
    cb();
  });
};
