const { INTEGER, Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        //defaultValue: Sequelize.UUIDV4
        //defaultValue: uuidv4()
        
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      }


  



      
    },
    {
      timestamps: false
    }
    
    
    );
  
    return Admin;
  };