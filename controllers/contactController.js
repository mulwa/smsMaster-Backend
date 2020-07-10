var db = require("../db/knex");
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.phoneNumber) {
    return res.status(400).send({
      sucess: false,
      message: "Name or PhoneNumber can not be empty",
    });
  }
  db("contact")
    .insert({
      name: req.body.name,
      phone_number: req.body.phoneNumber,
    })
    .then(
      (data) => {
        res.status(201).json({
          success: true,
          message: "contact created successfully",
          data,
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
};
// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
  db.select()
    .from("contact")
    .then(
      (contacts) => {
        if (contacts.length > 0) {
          return res.status(200).json({
            success: true,
            contacts,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "No contacts found",
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
// Find a single contact with phoneNumber
exports.findOne = (req, res) => {
  let searchkey = req.params.phoneNumber;

  db.select()
    .from("contact")
    .where("phone_number", searchkey)
    .then(
      (contact) => {
        if (contact.length > 0) {
          return res.status(200).json({
            success: "true",
            contact,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: `Group ${searchkey} not found`,
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
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  let id = req.params.id;
  // Validate request
  if (!req.body.name || !req.body.phoneNumber) {
    return res.status(400).send({
      sucess: false,
      message: "Name or PhoneNumber can not be empty",
    });
  }
  db("contact")
    .where("id", id)
    .update({
      name: req.body.name,
      phone_number: req.body.phoneNumber,
    })
    .then(
      (data) => {
        res.status(200).json({
          success: true,
          message: "contact updated successfully",
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
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);
  db("contact")
    .where("id", id)
    .del()
    .then(
      (_) => {
        res.status(200).json({
          success: true,
          message: "contact deleted successfully",
        });
      },
      (error) => {
        res.status(500).json({
          success: false,
          message: `Unable to delete contact ${error}`,
          data,
        });
      }
    );
};
