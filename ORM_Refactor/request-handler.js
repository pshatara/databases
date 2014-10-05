var db = require('./db');
var serverHelpers = require('./server-helpers');

var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;

exports.postMessage = function(req, res) {
  var message;

  var resultsCallback = function (results) {
      var chat = {
        message: message.message,
        userid: results.id,
        roomname: message.roomname
      };
      saveMessage(chat.message, chat.userid, chat.roomname, function () {
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
      message = msg;
      findUser(msg.username, function (err, results) {
        if (!results || !results.length) {
          saveUser(message.username, resultsCallback);
        } else {
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  findMessages(function(err, messages) {
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
