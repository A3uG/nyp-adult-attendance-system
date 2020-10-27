module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "A11w03lun",
    DB: "eventsdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };