'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Task = app.model.define('task_list', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: INTEGER(36),
    title: STRING(255),
    desc: STRING(255),
    creater_id: INTEGER(20),
    executor_id: INTEGER(20),
    executor_ids: INTEGER(255),
    status: INTEGER(20),
    c_time: DATE,
    r_time: DATE
  },{
    timestamps:true,
    createdAt:'c_time',
    updatedAt:'r_time'
  });
  return Task;
};
