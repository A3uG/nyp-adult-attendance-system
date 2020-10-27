const { INTEGER, Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Lecturer = sequelize.define("lecturer", {
      lectID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        //defaultValue: Sequelize.UUIDV4
        //defaultValue: uuidv4()
        
      },
      lectName: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      timestamps: false
    }
    );
    return Lecturer;
  };