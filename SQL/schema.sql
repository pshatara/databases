CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  msg_id int NOT NULL AUTO_INCREMENT,
  messageText varchar(255),
  userId int(20),
  roomName varchar(255),
  PRIMARY KEY(msg_id)
);

CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  userName varchar(255),
  PRIMARY KEY(id)
);
