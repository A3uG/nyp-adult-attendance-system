const db = require("../models");
const Event = db.event;
const Users = db.users;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

// Create and Save a new Event
exports.create = (req, res) => {
     // Validate request
  if (!req.body.eventName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Event
  const event = {
    eventName: req.body.eventName,
    eventCoordinator: req.body.eventCoordinator,
    eventOrganisation: req.body.eventOrganisation,
    eventTechnologyArea: req.body.eventTechnologyArea,
    eventDescription: req.body.eventDescription,
    eventContactPerson: req.body.eventContactPerson,
    eventContactPersonHP: req.body.eventContactPersonHP,
    eventContactPersonEmail: req.body.eventContactPersonEmail,
    eventDate: req.body.eventDate,
    //eventStartDate: req.body.eventStartDate,
    eventEndDate: req.body.eventEndDate,
    eventVenue: req.body.eventVenue,
    eventStartTime: req.body.eventStartTime,
    eventEndTime: req.body.eventEndTime
  };

  // Save Event in the database
  Event.create(
    event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    });
  
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
    const eventName = req.query.eventName;
    var condition = eventName ? { eventName: { [Op.like]: `%${eventName}%` } } : null;
  
    Event.findAll({ where: condition, include:[{model:db.users}], order: ['eventDate'] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Events."
        });
      });
  
};



// Find a single Event with an id
exports.findOne = (req, res) => {
    const eventID = req.params.id;

    Event.findByPk(eventID, {include:[{model:db.users}]} )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Event with id=" + id
        });
      });
  
};

// Update a Event by the id in the request
exports.update = (req, res) => {
    const eventID = req.params.id;

    Event.update(req.body, {
      where: { eventID: eventID }
     })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Event was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Event with id=${eventID}. Maybe Event was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Event with id=" + eventID
        });
      });
  
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
    const eventID = req.params.id;

  Event.destroy({
    where: { eventID: eventID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${eventID}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + eventID
      });
    });
  
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
    Event.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Events were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Events."
          });
        });
};

// Find all published Events
exports.findAllPublished = (req, res) => {
    Event.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Events."
      });
    });
};
