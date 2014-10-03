CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  messageText varchar(255),
  userId int(20),
  roomId int(20)
);

CREATE TABLE users (
  userName varchar(255),
  userId int(20)
);

CREATE TABLE rooms (
  roomName varchar(255),
  roomId int(20)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




