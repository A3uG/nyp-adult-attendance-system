const db = require("../models");
const Op = db.Sequelize.Op;
const Date = db.date;

exports.create = (req, res) => {
  const date = {
    date: req.body.date,
    checked: req.body.checked,
    eventEventID: req.body.eventEventID,
  }
  Date.create(date)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Date."
      });
    });
};

//Get all single Event data rows
exports.findOne = (req, res) => {
  const id = req.params.id;

  Date.findAll({ where: { eventEventID: id }, order: ['date'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving eventEventID with id=" + id
      });
    });

};

// Update Date by id
exports.update = (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  // console.log('///', req.body);

  Date.update(req.body, {
    where: { eventEventID: id, date: date },
    order: ['date']
  })
    .then(num => {
      res.send({
        message: "Date was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Date with id=" + id
      });
    });
};

// Delete an admin with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  // console.log('///', req.body);

  Date.destroy({
    where: { eventEventID: id, date: date }
  })
    .then(num => {
      res.send({
        message: "Date was deleted successfully!"
      });

    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete date with eventEventID=" + id + "with date=" + date
      });
    });
};