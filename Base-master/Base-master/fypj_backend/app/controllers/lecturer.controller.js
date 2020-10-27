const db = require("../models");
const Users = db.users;
const Event = db.event;
const Op = db.Sequelize.Op;
//const { v4: uuidv4 } = require('uuid');
const Lecturer = db.lecturer;

exports.findAll = (req, res) => {

    Lecturer.findAll({ order: ['lectName']}, )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Lecturers."
        });
      });

  };
