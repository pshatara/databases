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
/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
// User.sync().success(function() {
//   /* This callback function is called once sync succeeds. */
//   var newUser = User.build({username: "Jean Valjean"});

//   newUser.save().success(function() {
//     /* This callback function is called once saving succeeds. */
//     User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].username + " exists");
//       }
//     });
//   });
// });


