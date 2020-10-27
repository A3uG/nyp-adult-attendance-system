const { INTEGER, Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      eventID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        //type: Sequelize.UUID,
        primaryKey: true,
        //defaultValue: null
        
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventCoordinator: {
        type: Sequelize.STRING,
        allowNull: false
    

      },
      eventOrganisation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventTechnologyArea: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventDescription: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      eventContactPerson: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventContactPersonHP: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventContactPersonEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      // eventStartDate: {
      //   type: Sequelize.DATEONLY,
      //   allowNull: false
      // },
      eventEndDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      eventVenue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventStartTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventEndTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
    
      
    },
    {
      timestamps: false
    }
    
    
    );
  
    return Event;
  };

  