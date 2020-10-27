const db = require("../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create an admin
    const admin = {
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };
  
    // Save Admin in the database
    Admin.create(admin)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating Admin."
        });
      });
  };
  
  // Retrieve all admins from the database.
      exports.findAll = (req, res) => {
          const username = req.query.username;
          var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
        
          Admin.findAll({ where: condition, order: ['username'] })
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving admins."
              });
            });
      };

      exports.findOne = (req, res) => {
        const id = req.params.id;
      
        Admin.findByPk(id)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Admin with id=" + id
            });
          });
      
      };
  
  // Find a single Admin with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Admin.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Admin with id=" + id
        });
      });
  };
  
  // Update a Tutorial by the id in the request
  exports.update = (req, res) => {
      const id = req.params.id;
  
    Admin.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Admin was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update admin with id=${id}. Maybe admin was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating admin with id=" + id
        });
      });
  };
  
  // Delete an admin with the specified id in the request
  exports.delete = (req, res) => {
      const id = req.params.id;
  
    Admin.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Admin was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete admin with id=${id}. Maybe admin was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete admin with id=" + id
        });
      });
  };
  
  