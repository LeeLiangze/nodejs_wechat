
'use strict';
module.exports = app => {
    return class Task extends app.Controller {
        *search(){
            const { ctx } = this,
            {uid,key}=ctx.request.body;
            const result = yield ctx.service.task.search({uid,key});
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "未找任务",
                    beans: result
                }
            }
        }
        * findById() {
            const { ctx } = this;
            const id = ctx.params.id;
            const result = yield ctx.service.task.findById(id);
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "未找到该任务",
                    beans: result
                }
            }
        }
        * findByUuid() {
            const { ctx } = this;
            const uuid = ctx.params.uuid;
            const result = yield ctx.service.task.findByUuid(uuid);
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "未找到该任务",
                    beans: result
                }
            }
        }
        * findByUid(){
            const { ctx } = this;
            const id = ctx.params.id;
            const result = yield ctx.service.task.findByUid(id);
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "没有相关任务",
                    beans: result
                }
            }
        }
        *myTask(){
            const { ctx } = this;
            const id = ctx.params.id;
            const result = yield ctx.service.task.myTask(id);
            if (result) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "成功",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "没有相关任务",
                    beans: result
                }
            }
        }
        * add() {
            const { ctx } = this,
                { title, desc, creater_id, executor_ids } = ctx.request.body,
                uuid = getUUID(),
                executorArr = executor_ids.split(",");
            let successCount = 0;
            for(let i=0,len=executorArr.length;i<len;i++){
                let executor_id=executorArr[i];
                let returnData = yield ctx.service.task.add({ uuid, title, desc, creater_id, executor_id,executor_ids});
                if (returnData) {
                    successCount += 1;
                }
            }
            if(successCount>=executorArr.length){
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "创建成功",
                    beans: successCount
                }
            }
        }
        *updateByUuid() {
            const { ctx } = this;
            const { uuid, data } = ctx.request.body;
            //这个创建人才有修改权限
            const result = yield ctx.service.task.updateByUuid({ uuid, data });
            if (result[0] == 0) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "修改失败",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "修改成功",
                    beans: result
                }
            }
        }
        *deleteByUuid() {
            const { ctx } = this;
            const { uuid } = ctx.request.body;
            //这个只有创建人才有删除权限
            const result = yield ctx.service.task.deleteByUuid(uuid);
            if (result[0] == 0) {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "删除失败",
                    beans: result
                }
            } else {
                ctx.body = {
                    returnCode: 0,
                    returnMessage: "删除成功",
                    beans: result
                }
            }
        }
    };
};
//生成一个uuid作为有多个执行人时候该任务的唯一标识
function getUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};