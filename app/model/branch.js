'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Branch = app.model.define('branchs', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch: STRING(255)
  });
  return Branch;
};
