const msg = require("../controllers/msg");
var express = require("express");
var router = express.Router();
const Joi = require("joi");
const { Timestamp } = require("mongodb");
const { date } = require("joi");

router.get("/", function (req, res, next) {
  msg.getMsgs((msgs) => {
    res.send(msgs);
  });
});

router.get("/:ts", function (req, res, next) {
  msg.getMsg(parseInt(req.params.ts), (msg) => {
    if (!msg)
      return res.status(404).send("El mensaje con el ts dado no existe");
    res.send(msg);
  });
});

router.post("/", function (req, res, next) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res
      .status(400)
      .send(
        "The name, the message and the time stamp are required. There must be one name and one last name and the message must have at least 5 characters."
      );
  } else {
    const date = new Date();
    const mensaje = {
      message: req.body.message,
      author: req.body.author,
      ts: date.getTime(),
    };

    res.send(mensaje);
    msg.addMsg(mensaje);
  }
});

router.put("/:ts", function (req, res, next) {
  msg.getMsg(parseInt(req.params.ts), (msg_found) => {
    if (!msg_found)
      return res.status(404).send("El mensaje con el ts dado no existe");
    else {
      const schema = Joi.object({
        message: Joi.string().min(5).required(),
        author: Joi.string()
          .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
          .required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        console.log(error);
        return res.status(400).send(error);
      } else {
        let date = new Date();
        const newMsg = {
          message: req.body.message,
          author: req.body.author,
          ts: date.getTime(),
        };
        msg.updateMsg(
          parseInt(req.params.ts),
          newMsg.message,
          newMsg.author,
          newMsg.ts
        );
        res.send("Updated");
      }
    }
  });
});

router.delete("/:ts", function (req, res, next) {
  msg.getMsg(parseInt(req.params.ts), (msg_found) => {
    if (!msg_found)
      return res.status(404).send("El mensaje con el ts dado no existe");
    msg.deleteMsg(parseInt(req.params.ts));
    res.send("Deleted");
  });
});

module.exports = router;
