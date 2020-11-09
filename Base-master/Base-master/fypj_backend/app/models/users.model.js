const { INTEGER, Sequelize } = require("sequelize");
const sequelize = require("sequelize");
//const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      id: {
        //type: Sequelize.INTEGER,
        //autoIncrement: true,
        type: Sequelize.UUID,
        primaryKey: true,
        //defaultValue: Sequelize.UUIDV4
        //defaultValue: uuidv4()
        
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNum: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // amStatus: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // },
      // pmStatus: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // },
      userCompany: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventEventID: {
        type: Sequelize.INTEGER,
        allowNull: false

      }

  



      
    },
    {
      timestamps: false
    }
    
    
    );
  
    return Users;
  };

