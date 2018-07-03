'use strict';

module.exports = app => {
  const { STRING, INTEGER,DATE } = app.Sequelize;

  const Answer = app.model.define('answer_notes', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: INTEGER(20),
    tuuid: STRING(36),
    content: STRING(255),
    c_time: DATE
  },{
    timestamps:true,
    createdAt:'c_time',
    updatedAt:'c_time'
  });
  return Answer;
};
