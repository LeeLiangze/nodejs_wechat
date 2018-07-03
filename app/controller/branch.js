
'use strict';
module.exports = app => {
    return class Branch extends app.Controller {
        * add() {
            const { ctx } = this,
                { branch } = ctx.request.body;
            const result = yield this.ctx.service.branch.add({ branch });
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "失败",
                    beans: result
                }
            }
        }
        *edit() {
            const { ctx } = this,
                { id,branch } = ctx.request.body;
            const result = yield this.ctx.service.branch.edit({ id,branch });
            if (result[0]>0) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "失败",
                    beans: result
                }
            }
        }
        *list(){
            const {ctx}=this;
            const result = yield ctx.service.branch.list();
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "失败",
                    beans: result
                }
            }
        }
    };
};