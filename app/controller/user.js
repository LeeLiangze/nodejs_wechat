'use strict';

module.exports = app => {
    return class UserController extends app.Controller {
        * logout() {
            const { ctx } = this;
            ctx.session.adminUser = null;
            // this.retSuccess({ data: {success: 1} });
        };

        * register() {
            const { ctx } = this;
            const { openid, name, tel, email, branch_id, avatarurl, branch } = ctx.request.body,
                status = 0;
            const result = yield ctx.service.user.register({ openid, name, tel, email, branch_id, avatarurl, branch, status });
            ctx.body = {
                returnCode: 0,
                returnMessage: "成功",
                beans: result
            }
        }
        *edit() {
            const { ctx } = this,
                { id, data } = ctx.request.body;
            const result = yield this.ctx.service.user.edit({ id, data });
            ctx.body = {
                returnCode: 0,
                returnMessage: "修改成功",
                beans: result
            }
        }
        *login() {
            const { ctx } = this;
            const code = ctx.params.code;
            const result = yield app.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=wx1e72a989fc8c721e&secret=a367e4d5985708f76bcc5c32c5ff0d2a&js_code=${code}&grant_type=authorization_code`, {
                method: 'GET',
                dataType: 'json',
            });
            if (result.res.status == 200) {
                let { openid } = result.res.data,
                    beans = null;
                let user = yield ctx.service.user.findByOpenid(openid);
                if (user.length == 0) {
                    beans = {
                        openid,
                        status: -1
                    }
                } else {
                    beans = user[0];
                }
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "微信服务器请求失败",
                    beans: {}
                }
            }

        }
        *findByOpenid() {
            const { ctx } = this;
            const openid = ctx.params.id;
            const result = yield ctx.service.user.findByOpenid(openid);
            ctx.body = {
                returnCode: 0,
                returnMessage: "成功",
                beans: result
            }
        }
        *list() {
            const { ctx } = this;
            const result = yield ctx.service.user.list();
            ctx.body = {
                returnCode: 0,
                returnMessage: "成功",
                beans: result
            }
        }
        *executor() {
            const { ctx } = this;
            const { id } = ctx.request.body;
            const result = yield ctx.service.user.executor(id);
            ctx.body = {
                returnCode: 0,
                returnMessage: "成功",
                beans: result
            }
        }
    };
};
