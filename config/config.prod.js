
exports.sequelize = {
  dialect: 'mysql',
  database: 'vtask',
  host: '127.0.0.1',
  port: '3306',
  username: 'root',
  password: '123456',
  define: {
        timestamps: false,
        underscored:true,
        freezeTableName: true
    }
};
exports.logger = {
  level: 'DEBUG',
};