const { INTEGER, Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Date = sequelize.define("date", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        //defaultValue: Sequelize.UUIDV4
        //defaultValue: uuidv4()
        
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      checked: {
          type: Sequelize.BOOLEAN,
          allowNull: false
      }
    },
    {
      timestamps: false
    }
    );
    return Date;
  };