const db = require("../models");
const Users = db.users;
const Event = db.event;
const Op = db.Sequelize.Op;
//const { v4: uuidv4 } = require('uuid');
const EventUser = db.eventUser;

//create row by row from start to end date for every user
exports.create = (req, res) => {
  const eventUser = {
    date: req.body.date,
    amStatus: req.body.amStatus,
    pmStatus: req.body.pmStatus,
    eventEventID: req.body.eventEventID,
    userId: req.body.userID
  }
  EventUser.create(eventUser)
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

//Get single User data on specific date
exports.findOne = (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  // console.log("///", req.params);

  EventUser.findAll({ where: { userid: id, date: date } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });

};

//update user am-pm status
exports.updateStatus = (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  // console.log("///", req.params);
  // console.log("EVENTUSER", req.body); //note: no array format, if array get [0]

  EventUser.update(req.body, { //[0].amStatus
    where: { userId: id, date: date }
  })
    .then(num => {
      // console.log("NUM", num); //if correct, should be "NUM [0]""
      res.send({
        message: "User was updated successfully."
      });
      //num = 0, but still update db
      // if (num == 1) {
      //   res.send({
      //     message: "User was updated successfully."
      //   });
      // } else {
      //   res.send({
      //     message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      //   });
      // }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });

};

//Get single Event data on specific date, including Users table
exports.findAllToday = (req, res) => {
  const eventid = req.params.id;
  const date = req.params.date;

  EventUser.findAll({
    where: { eventEventID: eventid, date: date },
    include: [{ model: Users, required: true }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });

};



