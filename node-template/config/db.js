const { Sequelize } = require('sequelize');
const mysql_Sequelize = new Sequelize('node-template', 'root', 'hellomysql6B', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  pool:{
    max:5,
    min:0,
    idle:10000  // 如果一个线程10秒钟内没有被使用，那么就释放线程
  },
  define:{
    'charset': 'utf8' //处理Mysql中中文字符问题
  },
  logging: true
});

// 测试连接
mysql_Sequelize.authenticate().then(()=>{
  console.log('Connection has been established successfully.');
})
.catch ((error)=>{
    console.error('Unable to connect to the database:', error);
})


module.exports = mysql_Sequelize;
