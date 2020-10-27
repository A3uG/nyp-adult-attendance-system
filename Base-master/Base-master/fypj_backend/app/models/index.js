const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("./event.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.eventUser = require("./eventUser.model.js")(sequelize, Sequelize);
db.date = require("./date.model.js")(sequelize, Sequelize);
db.lecturer = require("./lecturer.model.js")(sequelize, Sequelize);

db.event.hasMany(db.users);
db.users.belongsTo(db.event);

db.event.hasMany(db.eventUser);
db.eventUser.belongsTo(db.event);

db.users.hasMany(db.eventUser);
db.eventUser.belongsTo(db.users);

db.event.hasMany(db.date);
db.date.belongsTo(db.event);

db.lecturer.hasMany(db.event);
db.event.belongsTo(db.lecturer);

module.exports = db;