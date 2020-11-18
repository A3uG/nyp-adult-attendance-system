const db = require("../models");
const Users = db.users;
const Event = db.event;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');
const { start } = require("repl");
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
  //1. retrieve event start date & end date
  //2. generate a list of dates in between start and end
  //3. get splitStr from .csv file, assign to newAttendee 
  //4.  add eventuser, dun care if date exist anot. date table will handle (date only show if user checked the date) 

  // console.log('//', req.body);
  var attendeeData = req.body;

  var startDate, endDate, currentDate;
  var dateArray = [];

  Event.findByPk(req.params.id)
    .then(data => {
      startDate = new Date(data.dataValues.eventDate);
      endDate = new Date(data.dataValues.eventEndDate);
      currentDate = startDate;
      console.log(startDate, endDate);

      // get a list of dates in-between start and end date
      while (currentDate <= endDate) {
        // console.log(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        dateArray.push(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate());
      }
      // console.log("dateArray", dateArray);

      for (var i = 0; i < attendeeData.length; i++) {
        // console.log("-----");
        // console.log(attendeeData[i]);

        if (!i == 0) {      //remove first line header
          var splitStr = attendeeData[i].split(",");
          // console.log('split', splitStr);

          var newAttendee = {
            fullName: splitStr[2],
            phoneNum: splitStr[3],
            email: splitStr[4],
            eventEventID: req.params.id,
            id: uuidv4(),
            userCompany: splitStr[5],
            age: splitStr[6],
            gender: splitStr[7]
          }
          // console.log(newAttendee);

          Users.create(newAttendee)
            .then(data => {
              // res.send("Upload Success!");
            });

          //ok now, do a for loop for multiple dates
          for (var j = 0; j < dateArray.length; j++) {
            const eventUser = {
              date: dateArray[j],
              amStatus: false,
              pmStatus: false,
              eventEventID: req.params.id,
              userId: newAttendee.id
            };
            // console.log(dateArray[j]);

            EventUser.create(eventUser)
              .then(data => {
                // res.send(data);
              });
          }
        }
      }
    });

  res.send("Upload Success!");
};