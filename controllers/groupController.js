var db = require("../db/knex");
// Create and Save a new Group
exports.create = (req, res) => {
     // Validate request
  if (!req.body.groupName) {
    return res.status(400).send({
      sucess: false,
      message: "Please Provide GroupName",
    });
  }
  db("group")
    .insert({
        group_name: req.body.groupName,      
    })
    .then(
      (_) => {
        res.status(201).json({
          success: true,
          message: "Group created successfully",
          
        });
      },
      (error) => {
        res.status(500).json({
          success: false,
          message: `Unable to create Group ${error}`,          
        });
      }
    );

};

// Retrieve and return all Groups from the database.
exports.findAll = (req, res) => {
    db.select()
    .from("group")
    .then(
      (groups) => {
        if (groups.length > 0) {
          return res.status(200).json({
            success: true,
            groups,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "No groups found",
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

// Find a single Group with a GroupId
exports.findOne = (req, res) => {
    let searchkey = req.params.id;

  db.select()
    .from("group")
    .where("id", searchkey)
    .then(
      (group) => {
        if (group.length > 0) {
          return res.status(200).json({
            success: "true",
            group,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: `${searchkey} not found`,
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

// Update a Group identified by the GroupId in the request
exports.update = (req, res) => {
    let id = req.params.id;
  // Validate request
  if (!req.body.groupName ) {
    return res.status(400).send({
      sucess: false,
      message: "Name or PhoneNumber can not be empty",
    });
  }
  db("group")
    .where("id", id)
    .update({
        group_name: req.body.groupName,  
      
    })
    .then(
      (data) => {
        res.status(200).json({
          success: true,
          message: "Group updated successfully",
        });
      },
      (error) => {
        res.status(500).json({
          success: false,
          message: `Unable to Update group ${error}`,
          data,
        });
      }
    );

};

// Delete a Group with the specified GroupId in the request
exports.delete = (req, res) => {
    let id = req.params.id;
  console.log(req.params.id);
  db("group")
    .where("id", id)
    .del()
    .then(
      (_) => {
        res.status(200).json({
          success: true,
          message: "group deleted successfully",
        });
      },
      (error) => {
        res.status(500).json({
          success: false,
          message: `Unable to delete group ${error}`,
          data,
        });
      }
    );

}

exports.addToGroup = (req, res) => {
    // Validate request
  if (!req.body.userId || !req.body.groupId) {
    return res.status(400).send({
      sucess: false,
      message: "GroupId or UserId can not be empty",
    });
  }
  db("contact-group")
    .insert({
      user_id: req.body.userId,
      group_id: req.body.groupId
    })
    .then(
      (data) => {
        res.status(201).json({
          success: true,
          message: "user Joined Group successfully",
          data,
        });
      },
      (error) => {
        res.status(500).json({
          success: false,
          message: `Unable to Join group ${error}`,
          data,
        });
      }
    );

};
exports.getAllGroup = (req, res) => {
    db.select()
    .from("contact-group")
    .then(
      (groups) => {
        if (groups.length > 0) {
          return res.status(200).json({
            success: true,
            contact_group:groups,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "No groups found",
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

// get all users of  a single Group with a GroupId
exports.findGoupUsersWithGroup = (req, res) => {
    let searchkey = req.params.id;

  db.select()
    .from("contact-group")
    .innerJoin('contact', 'contact-group.user_id', 'contact.id')
    .where("group_id", searchkey)
    .then(
      (members) => {
        if (members.length > 0) {
          return res.status(200).json({
            success: "true",
            members,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: `${searchkey} not found`,
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