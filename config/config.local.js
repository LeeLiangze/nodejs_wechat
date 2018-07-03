//   exports.sequelize = {
//       dialect: 'mysql',
//       database: 'vtask',
//       host: 'localhost',
//       port: '3306',
//       username: 'root',
//       password: '123456',
//       timezone: '+08:00',
//       define: {
//           timestamps: false,
//           underscored: true,
//           freezeTableName: true
//       }
//   };
  exports.sequelize = {
    dialect: 'mysql',
    database: 'vtask',
    host: '47.104.66.124',
    port: '3306',
    username: 'root',
    password: '123456',
    timezone: '+08:00',
    define: {
        timestamps: false,
        underscored:true,
        freezeTableName: true
    }
};