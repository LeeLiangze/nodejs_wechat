'use strict';
const moment = require('moment');
moment.locale("zh-cn");
module.exports = app => {
  return class Answer extends app.Service {
    * add(data){
      return yield this.ctx.model.Answer.create(data);
    }
    * delete(id){
      return yield this.ctx.model.Answer.destroy({
        where:{
          id
        }
      });
    }
    *list(uuid){
      let returnData=[];
      const answers = yield this.ctx.model.Answer.findAll({
        where:{
          tuuid:uuid
        }
      });
      for(let i=0,len=answers.length;i<len;i++){
        const uid=answers[i].uid;
        const user=yield this.ctx.model.User.findById(uid);
        let answer=answers[i];
        answer.dataValues.relativeTime=moment(answer.c_time).fromNow();
        returnData.push({
          answer:answer,
          user
        })
      }
      return returnData
    }
  };
};
