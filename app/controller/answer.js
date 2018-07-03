
'use strict';
module.exports = app => {
    return class Answer extends app.Controller {
        * add() {
            const { ctx } = this,
                {tuuid,uid,content } = ctx.request.body;
            const result = yield this.ctx.service.answer.add({ tuuid,uid,content });
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
        *delete(){
            const { ctx } = this,
                {id } = ctx.request.body;
            const result = yield this.ctx.service.answer.delete(id);
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
        *list(){
            const { ctx } = this,
            uuid = ctx.params.uuid;
            const result = yield this.ctx.service.answer.list(uuid);
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