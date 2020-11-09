const db = require("../models");
const Users = db.users;
const Event = db.event;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');
const EventUser = db.eventUser;

exports.createuser = (req, res) => {
  // Validate request
  if (!req.body.fullName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create user
  const user = {
    //id: uuidv4(),
    id: req.body.id,
    fullName: req.body.fullName,
    phoneNum: req.body.phoneNum,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    eventEventID: req.body.eventEventID,
    userCompany: req.body.userCompany
  };

  // Save Event in the database
  Users.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

};

exports.findAll = (req, res) => {
  const phoneNum = req.query.phoneNum;
  var condition = phoneNum ? { phoneNum: { [Op.like]: `%${phoneNum}%` } } : null;

  Users.findAll({ where: condition, order: ['fullName'] },)
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });

};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log("USER", req.body);
  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });

};


exports.findAllbyeventidandhp = (req, res) => {
  const eventid = req.params.id;
  const phoneNum = req.params.phone;

  Users.findAll({ where: { eventEventID: eventid, phoneNum: phoneNum } })
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

exports.findAllbyeventid = (req, res) => {
  const eventid = req.params.id;

  Users.findAll({ where: { eventEventID: eventid }, order: ['fullName'] })
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

exports.uploadAllUser = (req, res) => {

  // console.log('//', req.body);
  var attendeeData = req.body;

  for (var i = 0; i < attendeeData.length; i++) {
    // console.log("-----");
    // console.log(attendeeData[i]);

    var splitStr = attendeeData[i].split(",");
    // console.log('split', splitStr);

    newAttendee = {
      fullName: splitStr[0],
      phoneNum: splitStr[1],
      email: splitStr[2],
      eventEventID: req.params.id,
      id: uuidv4(),
      userCompany: splitStr[3]
    }

    Users.create(newAttendee)
      .then(data => {
        // res.send("Upload Success!");
      });
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while creating the Attendee."
    //   });
    // });


    // need to generate users into eventuser db
    // need to retrieve date

    // const eventUser = {
    //   date: req.body.date,
    //   amStatus: false,
    //   pmStatus: false,
    //   eventEventID: req.params.id,
    //   userId: newAttendee.id
    // }
    // EventUser.create(eventUser)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Event."
    //     });
    //   });
  }
  res.send("Upload Success!");
};