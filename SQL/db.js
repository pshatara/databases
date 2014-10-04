var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "KevinPeter",
  password: "puppies4lyfe",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/


exports.findAllMessages = function(cb){
  var getDataQuery = 'SELECT * FROM messages INNER JOIN users ON users.userId = messages.userId INNER JOIN rooms ON rooms.roomId = messages.roomId';
  var messages = [];
  dbConnection.query(getDataQuery, function(err, rows, fields){
    for ( var i = 0; i < rows.length; i++ ){
      messages.push({
        text: rows[i].messageText,
        user: rows[i].userName,
        room: rows[i].roomName
      });
    }
    cb(err, messages);
  });
};

exports.findUser = function(username, cb){
  // check if user exists
  dbConnection.query('SELECT * FROM users WHERE userName = ' + username, function(err, rows){
    cb(err, rows);
  });
};

exports.saveUser = function(username, cb){
  dbConnection.query('INSERT INTO users (userName) VALUES(' + username + ');', function(err, results){
    cb(results);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query('INSERT INTO messages (messageText, userId, roomName) VALUES (' + message + ', ' + userid + ', ' + roomname + ');', function(err) {
    if (err) { throw err; }
    cb();
  });
};
