var db = require("../db/knex");
const AfricasTalking = require("../smsConfig");

exports.sendSms = (req, res) => {
  const sms = AfricasTalking.SMS;

  if (!req.body.message || !req.body.phoneNumber || !req.body.userId) {
    return res.status(400).send({
      sucess: false,
      message: "Message , Receiver Phone Number and userId is Required",
    });
  }

  const opts = {
    to: `+${req.body.phoneNumber}`,
    from: "7817",
    message: req.body.message,
  };

  sms
    .send(opts)
    .then(function (success) {
      db("messages")
        .insert({
          user_id: req.body.userId,
          phone_number: req.body.phoneNumber,
          message: req.body.message,
        })
        .then(
          (data) => {
            res.status(201).json({
              success: true,
              message: "Message send and created successfully",
              
            });
          },
          (error) => {
            res.status(500).json({
              success: false,
              message: `Unable to save message ${error}`,              
            });
          }
        );
    })
    .catch(function (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    });
};
exports.getMessages = (req, res) => {
  db.select()
    .from("messages")
    .then(
      (messages) => {
        if (messages.length > 0) {
          return res.status(200).json({
            success: true,
            messages,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "No messages found",
          });
        }
      },
      (error) => {
        return res.status(500).json({
          success: false,
          message: "server error" + error,
        });
      }
    );
};
