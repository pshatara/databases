/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "KevinPeter",
      password: "puppies4lyfe",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messages";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:3000/classes/messages",
             json: {username: "Valjean",
                    message: "In mercy's name, three days is all I need.",
                    roomname: "Hello"}
            },
            function () {
              var queryString = "SELECT * FROM messages INNER JOIN users ON users.id = messages.userId WHERE userName = ?";
              var queryArgs = ['Valjean'];
              dbConnection.query( queryString, queryArgs,
                function(err, results) {
                  // Should have one result:
                  expect(results.length).to.equal(1);
                  expect(results[0].messageText).to.equal("In mercy's name, three days is all I need.");

                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    var queryString = "SELECT * FROM messages INNER JOIN users ON users.id = messages.userId WHERE users.userName = ?";
    var queryArgs = ['Valjean'];

    dbConnection.query('INSERT INTO messages (messageText, userId, roomName) VALUES ( ?, ?, ?);', ["Men like you can never change!", 6, "main"] );
    dbConnection.query( queryString, queryArgs,
      function(err) {
        if (err) { throw err; }
        request("http://127.0.0.1:3000/classes/messages",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].messageText).to.equal("Men like you can never change!");
            expect(messageLog[0].roomName).to.equal("main");
            done();
          });
      });
  });
});
