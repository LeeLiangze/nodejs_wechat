'use strict';
const moment = require('moment');
moment.locale("zh-cn");
module.exports = app => {
  return class Task extends app.Service {
    *search({ uid, key }) {
      let titleArr = [],
        userArr = [],
        descArr = [];
      const titleUuids = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid']],
        where: {
          $or: [{ creater_id: uid }, { executor_id: uid }],
          title: {
            $like: "%" + key + "%"
          }
        }
      });
      const descUuids = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid']],
        where: {
          $or: [{ creater_id: uid }, { executor_id: uid }],
          desc: {
            $like: "%" + key + "%"
          }
        }
      });
      const users = yield this.ctx.model.User.findAll({
        attributes: ["id"],
        where: {
          name: {
            $like: "%" + key + "%"
          }
        }
      });
      titleArr = yield this.getArrByUuids(titleUuids);
      descArr = yield this.getArrByUuids(descUuids);
      let uids = [];
      users.forEach((v) => {
        uids.push(v.id);
      })
      const userUuids = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid']],
        where: {
          $and:{
            $or: [{
              creater_id: uid
            }, {
              executor_id: uid
            }],
            $or: [{
              creater_id: {
                $in: uids
              }
            }, {
              executor_id: {
                $in: uids
              }
            }]
          }
        }
      });
      userArr = yield this.getArrByUuids(userUuids);
      return {
        userArr,
        titleArr,
        descArr
      }
    }
    * findByUuid(uuid) {
      const tasks = yield this.ctx.model.Task.findAll({
        where: {
          uuid
        }
      });
      let task = tasks[0],
        creater_id = task.creater_id,
        executor_ids = task.executor_ids.split(",");
      const creater = yield this.ctx.model.User.findById(creater_id);
      const executor = yield this.ctx.model.User.findAll({
        where: {
          id: {
            $in: executor_ids
          }
        }
      });
      task.dataValues.relativeTime=moment(task.c_time).fromNow();
      return {
        task,
        creater,
        executor
      }
    }
    * findByUid(id) {
      let returnCreat = [],
        returnExecute = [];
      let createrArr = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid'], "title", "creater_id", "c_time", "status", 'executor_ids'],
        where: {
          creater_id: id,
          status: 0
        }
      });
      if (createrArr.length > 0) {
        // const uid = createrArr[0].creater_id;
        const creater = yield this.ctx.model.User.findById(id);
        for (let i = 0, len = createrArr.length; i < len; i++) {
          let data = createrArr[i].dataValues,
            executor_ids = data.executor_ids.split(',');
          data.relativeTime=moment(data.c_time).fromNow();
          data.name = creater.name;
          data.avatarurl = creater.avatarurl;
          const executor = yield this.ctx.model.User.findAll({
            where: {
              id: {
                $in: executor_ids
              }
            }
          })
          let executorNames = [];
          executor.forEach(v => {
            executorNames.push(v.name)
          })
          data.executors = executorNames.join(',');
          returnCreat.push(data);
        }
      }

      const executorArr = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid'], "title", "creater_id", "c_time", "status", 'executor_ids'],
        where: {
          executor_id: id,
          status: 0
        }
      });
      for (let i = 0, len = executorArr.length; i < len; i++) {
        let uid = executorArr[i].creater_id;
        let creater = yield this.ctx.model.User.findById(uid);
        let data = executorArr[i].dataValues,
          executor_ids = data.executor_ids.split(',');
        data.relativeTime=moment(data.c_time).fromNow();
        data.name = creater.name;
        data.avatarurl = creater.avatarurl;
        const executor = yield this.ctx.model.User.findAll({
          where: {
            id: {
              $in: executor_ids
            }
          }
        })
        let executorNames = [];
        executor.forEach(v => {
          executorNames.push(v.name)
        })
        data.executors = executorNames.join(',');
        returnExecute.push(data);
      }
      return {
        creat: returnCreat,
        execute: returnExecute
      }
    }
    * myTask(id) {
      let returnCreat = [],
        returnExecute = [];
      let createrArr = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid'], "title", "creater_id", "c_time", "status", 'executor_ids'],
        where: {
          creater_id: id
        }
      });
      if (createrArr.length > 0) {
        const uid = createrArr[0].creater_id;
        const creater = yield this.ctx.model.User.findById(uid);
        for (let i = 0, len = createrArr.length; i < len; i++) {
          let data = createrArr[i].dataValues,
            executor_ids = data.executor_ids.split(',');
          data.name = creater.name;
          data.avatarurl = creater.avatarurl;
          data.relativeTime=moment(data.c_time).fromNow();
          const executor = yield this.ctx.model.User.findAll({
            where: {
              id: {
                $in: executor_ids
              }
            }
          })
          let executorNames = [];
          executor.forEach(v => {
            executorNames.push(v.name)
          })
          data.executors = executorNames.join(',');
          returnCreat.push(data);
        }
      }
      const executorArr = yield this.ctx.model.Task.findAll({
        attributes: [[app.Sequelize.literal('distinct `uuid`'), 'uuid'], "title", "creater_id", "c_time", "status", 'executor_ids'],
        where: {
          executor_id: id
        }
      });
      for (let i = 0, len = executorArr.length; i < len; i++) {
        let uid = executorArr[i].creater_id;
        let creater = yield this.ctx.model.User.findById(uid);
        let data = executorArr[i].dataValues,
          executor_ids = data.executor_ids.split(',');
        data.name = creater.name;
        data.avatarurl = creater.avatarurl;
        data.relativeTime=moment(data.c_time).fromNow();
        const executor = yield this.ctx.model.User.findAll({
          where: {
            id: {
              $in: executor_ids
            }
          }
        })
        let executorNames = [];
        executor.forEach(v => {
          executorNames.push(v.name)
        })
        data.executors = executorNames.join(',');
        returnExecute.push(data);
      }
      return {
        creat: returnCreat,
        execute: returnExecute
      }
    }
    * add(data) {
      return yield this.ctx.model.Task.create(data);
    }
    * updateByUuid({ uuid, data }) {
      const ids = yield this.getIdsByUuid(uuid);
      return yield this.ctx.model.Task.update(data, {
        where: {
          id: {
            $in: ids
          }
        }
      });
    }
    *deleteByUuid(uuid) {
      const ids = yield this.getIdsByUuid(uuid);
      return yield this.ctx.model.Task.destroy({
        where: {
          id: {
            $in: ids
          }
        }
      });
    }
    * getIdsByUuid(uuid) {
      const tasks = yield this.ctx.model.Task.findAll({
        attributes: ["id"],
        where: {
          uuid
        }
      });
      let ids = [];
      for (let i = 0, len = tasks.length; i < len; i++) {
        const data = tasks[i].dataValues;
        ids.push(data.id)
      }
      return ids;
    }
    * getArrByUuids(uuids) {
      let arr = [];
      for (let i = 0, len = uuids.length; i < len; i++) {
        const { task: { uuid, title, c_time,status }, creater: { name, avatarurl }, executor } = yield this.findByUuid(uuids[i].uuid);
        let executorArr = [];
        executor.forEach((v) => {
          executorArr.push(v.name)
        })
        const executors = executorArr.join(","),
          relativeTime=moment(c_time).fromNow();
        arr.push({ uuid, title, name, avatarurl, c_time,relativeTime, executors,status });
      }
      return arr;
    }
  };
};


