const { eventUser, lecturer } = require("../models/index.js");

module.exports = app => {
    const events = require("../controllers/event.controller.js");
    const users = require("../controllers/users.controller.js");
    const Admin = require("../controllers/admin.controller.js");
    const eventUser = require("../controllers/eventUser.controller.js");
    const date = require("../controllers/date.controller.js");
    const lecturer = require("../controllers/lecturer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new event
    router.post("/", events.create);
  
    // Retrieve all events
    router.get("/", events.findAll);

  
    // Retrieve a single event with id
    router.get("/:id", events.findOne);
  
    // Update a event with id
    router.put("/:id", events.update);
  
    // Delete a event with id
    router.delete("/:id", events.delete);
  
    // Create a new event
    router.delete("/", events.deleteAll);
    app.use('/api/events', router);

    // Users

    router.post("/users", users.createuser);

    router.get('/users/all',users.findAll);

    router.get('/users/all/:id',users.findOne);

    router.put('/users/update/:id',users.update);

    router.get('/users/:id/:phone',users.findAllbyeventidandhp);

    router.get('/users/:id',users.findAllbyeventid);

    router.post("/users/:id/upload", users.uploadAllUser);

    // Admin

    router.post("/admin",Admin.create);
    router.get("/admin/all",Admin.findAll);
    router.get("/admin/all/:id",Admin.findOne);
    router.put("/admin/update/:id",Admin.update);
    router.delete("/admin/delete/:id",Admin.delete);
    

    //EventUser
    router.post("/eventUser", eventUser.create);

    //Get single User data on specific date
    router.get("/eventUser/:id/:date", eventUser.findOne);

    //Update user am-pm status
    router.put("/eventUser/update/:id/:date", eventUser.updateStatus);

    //Get single Event data on specific date
    router.get("/eventUser/all/:id/:date", eventUser.findAllToday);



    //Date
    router.post("/date", date.create);

    router.get("/date/:id", date.findOne);

    router.put("/date/update/:id/:date", date.update);
    
    router.delete("/date/delete/:id/:date", date.delete);



    //Lecturer
    router.get("/lecturers/all", lecturer.findAll);

  };