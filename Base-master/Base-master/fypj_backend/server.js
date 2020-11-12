const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //next();
});
*/

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/* WILL ERASE DB DATA*/
// const db = require("./app/models");
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});


require("./app/routes/event.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Export app for testing purpose
module.exports = app;