const conn = require("../lib/MongoUtils");

const getMsgs = (callback) =>
  conn.then((client) => {
    //Selección de la base de datos y collección
    client
      .db("db_chat")
      .collection("messages")
      .find({})
      .toArray((err, data) => {
        console.log(data);
        callback(data);
      });
  });

const getMsg = (ts, callback) =>
  conn.then((client) => {
    //Selección de la base de datos y collección
    client
      .db("db_chat")
      .collection("messages")
      .findOne({ ts })
      .then((result) => {
        callback(result);
      });
  });

const addMsg = (msg) => {
  conn.then((client) => {
    client.db("db_chat").collection("messages").insertOne(msg);
  });
};

const updateMsg = (ts, message, author, nts) => {
  conn.then((client) => {
    client
      .db("db_chat")
      .collection("messages")
      .updateOne(
        { ts },
        { $set: { message: message, author: author, ts: nts } }
      );
  });
};

const deleteMsg = (ts) => {
  conn.then((client) => {
    client.db("db_chat").collection("messages").deleteOne({ ts });
  });
};

const msg = { getMsgs, getMsg, addMsg, updateMsg, deleteMsg };
module.exports = msg;
