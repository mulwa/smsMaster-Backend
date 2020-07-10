var db = require("../db/knex");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// {id: 1, name: 'Christopher Mulwa',email:'mulwatech@gmail.com',password:'password'},

exports.createUser = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({
      sucess: false,
      message: "name, email and password is Required",
    });
  }
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    db("users")
      .insert({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
      .then(
        (data) => {
          res.status(201).json({
            success: true,
            message: "account created successfully",
          });
        },
        (error) => {
          res.status(500).json({
            success: false,
            message: `Unable to create contact ${error}`,
            data,
          });
        }
      );
  });
};

exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      sucess: false,
      message: "Email and password is Required",
    });
  }
  db.select()
    .from("users")
    .where("email", req.body.email)
    .then(
      (user) => {
        if (user.length > 0) {
          bcrypt
            .compare(req.body.password, user[0].password)
            .then(function (result) {
              if(result){
                var token = jwt.sign(
                  {
                    email: user[0].email,
                    password: user[0].password,
                    id: user[0]._id,
                  },
                  "mulwatech",
                  {
                    expiresIn: "7d",
                  }
                );
                return res.status(200).json({
                  status: true,
                  message: "Authentication successful",
                  token: token,
                });

              }else{
                return res.status(401).json({
                  status: false,
                  message: "Wrong Credentials",
                });

              }
              
            }, error => {
              return res.status(200).json({
                success: false,
                message: error,
                user,
              });
              
            });

         
        } else {
          return res.status(404).json({
            success: false,
            message: `no user found`,
          });
        }
      },
      (error) => {
        return res.status(500).json({
          success: false,
          message: `error ${error}`,
        });
      }
    );
};
