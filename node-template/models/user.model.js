const moment = require("moment");
const Sequelize = require('sequelize');
const  mysql_Sequelize = require('../config/db');

const User = mysql_Sequelize.define("users",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field:'id'
        },
        username: {
            type: Sequelize.STRING,
            field:'username'
        },
        password: {
            type: Sequelize.STRING,
            field:'password'
        },
        phone: {
            type: Sequelize.STRING,
            field:'phone'
        },
        avatar: {
            type: Sequelize.STRING,
            field:'avatar'
        },
        token: {
            type: Sequelize.INTEGER,
            field:'token'
        },
        status: {
          type: Sequelize.INTEGER,
          field:'status'
        },
        create_time: {
            type: Sequelize.DATE,
            field:'create_time',
            get(){
                return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        update_time: {
          type: Sequelize.DATE,
          field:'update_time',
          get(){
              return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
          }
        },
},
{
    timestamps: false,
    tableName: 'user', // 手动指定表名
})

module.exports = User;