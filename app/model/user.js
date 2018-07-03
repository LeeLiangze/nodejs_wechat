'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    openid: STRING(50),
    name: STRING(50),
    tel: STRING(20),
    email: STRING(50),
    branch_id: STRING(20),
    branch: STRING(255),
    avatarurl: STRING(255),
    status: INTEGER(10)
  });
  return User;
};
