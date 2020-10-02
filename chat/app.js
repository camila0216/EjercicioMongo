var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const Joi = require("joi");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/chat/api/messages", indexRouter);

module.exports = app;

//Creating file
let msgs = {
  messages: [
    {
      message: "Message updated",
      author: "Juan José Rodríguez",
      ts: 1599868276352,
    },
  ],
};
let data = JSON.stringify(msgs, null, 2);
fs.writeFile("msgs.json", data, (err) => {
  if (err) throw err;
  console.log("Data written to file");
});

//Get endpoint
/*app.get("/chat/api/messages", (req, res) => {
  fs.readFile("msgs.json", function (err, data) {
    res.send(JSON.parse(data));
  });
});*/

//Get by id endpoint
/*app.get("/chat/api/messages/:ts", (req, res) => {
  fs.readFile("msgs.json", function (err, data) {
    const content = JSON.parse(data);
    console.log(content);
    const msg = content.messages.find(
      (ms) => ms.ts === parseInt(req.params.ts)
    );
    if (!msg)
      return res
        .status(404)
        .send("404: The message with the given id was not found");
    res.send(msg);
  });
});*/

//Post endpoint
/*app.post("/chat/api/messages", (req, res) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
      .required(),
    ts: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res
      .status(400)
      .send(
        "The name, the message and the time stamp are required. There maust be one name and one last name and the message must have at least 5 characters."
      );
  } else {
    let content = JSON.parse(fs.readFileSync("msgs.json", "utf8"));

    const msg = {
      message: req.body.message,
      author: req.body.author,
      ts: req.body.ts,
    };

    content.messages.push(msg);
    fs.writeFileSync("msgs.json", JSON.stringify(content));
    res.send(msg);
  }
});*/

//Put endpoint
/*app.put("/chat/api/messages/:ts", (req, res) => {
  let content = JSON.parse(fs.readFileSync("msgs.json", "utf8"));
  const msg = content.messages.find((ms) => ms.ts === parseInt(req.params.ts));
  if (!msg)
    return res
      .status(404)
      .send("404: The message with the given id was not found");

  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
      .required(),
    ts: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error);
  } else {
    const newMsg = {
      message: req.body.message,
      author: req.body.author,
      ts: req.body.ts,
    };

    content.messages.find((ms) => ms.ts === parseInt(req.params.ts)).message =
      newMsg.message;
    content.messages.find((ms) => ms.ts === parseInt(req.params.ts)).author =
      newMsg.author;
    content.messages.find((ms) => ms.ts === parseInt(req.params.ts)).ts =
      newMsg.ts;

    fs.writeFileSync("msgs.json", JSON.stringify(content));
    res.send(newMsg);
  }
});*/

//Delete end point
/*app.delete("/chat/api/messages/:ts", (req, res) => {
  fs.readFile("msgs.json", function (err, data) {
    let content = JSON.parse(data);
    const msg = content.messages.find(
      (ms) => ms.ts === parseInt(req.params.ts)
    );

    if (!msg)
      return res
        .status(404)
        .send("404: The message with the given ts was not found");

    const i = content.messages.indexOf(msg);
    if (i > -1) {
      content.messages.splice(i, 1);
    }

    fs.writeFile("msgs.json", JSON.stringify(content), function (err) {
      if (err) throw err;
      res.send("Message Deleted");
    });
  });
});*/
