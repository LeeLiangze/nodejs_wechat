'use strict';

const crypto = require('crypto');

module.exports = app => {
  return class User extends app.Service {
    *login(){
      
    }
    * login_old(info) {
      // console.log('0000===',info.password)
      const user = yield this.ctx.model.User.findByUser(info.username);
      const md5 = crypto.createHash('md5');
      // console.log('1111===',user.password);
      const password = md5.update(user.username + info.password).digest('hex');
      // console.log('333===', password)
      // console.log('444===', user.encrypt)
      const token = app.jwt.sign({ cmos: 'cmos' }, app.config.jwt.secret);
      console.log('token=====', token);
      if (password === user.password) {
        const { ctx } = this;
        ctx.session.adminUser = { id: user.id, name: username };
        return true;
      }
      return false;
    }
    * register(data) {
      const { ctx } = this;
      // const encrypt = ctx.helper.createRandomStr(6);
      // const md5 = crypto.createHash('md5');
      // const password = md5.update(info.username + info.password).digest('hex');
      // console.log(password)
      // const user = {
      //   username: info.username,
      //   email: info.email,
      //   password,
      // };
      return yield this.ctx.model.User.create(data);
    }
    *edit({ id, data }) {
      const result= yield this.ctx.model.User.update(data, {
        where: {
          id
        }
      });
      if (result[0] > 0) {
        return yield this.ctx.model.User.findById(id);
      }else{
        return 0;
      }
    }
    *findByOpenid(openid) {
      return yield this.ctx.model.User.findAll({
        where: {
          openid
        }
      });
    }
    *list() {
      //用户状态：0待审核1审核通过正常状态2审核未通过3禁用
      const wait = yield this.ctx.model.User.findAll({ where: { status: 0 } });
      const normal = yield this.ctx.model.User.findAll({ where: { status: {
        $in:[1,3]
      } } });
      const reject = yield this.ctx.model.User.findAll({ where: { status: 2 } });
      return {
        wait,
        normal,
        reject
      };
    }
    *executor(id) {
      //const branch_ids = yield this.ctx.model.User.findAll({ attributes: ['branch_id', 'branch'], group: "branch_id", raw: true });
      //5.7.20版本sql使用group报错，所以就遍历了部门表
      const branchs=yield this.ctx.model.Branch.findAll(); 
      let returnData = [];
      for (let i = 0, len = branchs.length; i < len; i++) {
        const {id:branch_id,branch}=branchs[i].dataValues;
        const users = yield this.ctx.model.User.findAll({
          where: {
            branch_id,
            status:1,
            id:{
              $not:id
            }
          }
        });
        if(users.length===0){continue;}
        returnData.push({
          branch,
          users
        })
      }
      return returnData
    }
  };
};
