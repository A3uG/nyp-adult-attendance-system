const { INTEGER, Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const EventUser = sequelize.define("eventUser", {
      eventUserID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        //type: Sequelize.UUID,
        primaryKey: true,
        //defaultValue: null 
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      amStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      pmStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      eventEventID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      // userid: {
      //   type: Sequelize.UUID,
      //   allowNull: false
      // },
      
 
    },
    {
      timestamps: false
    }
    
    
    );
  
    return EventUser;
  };