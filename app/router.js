'use strict';

module.exports = app => {
  app.get('/', 'client.index');
  // upload
  app.post('/vtask/upload', 'uploadfile');
  // auth
  app.post('/vtask/login', 'user.login');
  app.get('/vtask/logout', 'user.logout');
  app.post('/vtask/register', 'user.register');
  // post
  app.get('/vtask/posts', 'post.posts');
  app.get('/vtask/posts/:id', 'post.post');
  app.post('/vtask/users/:user_id/posts', 'post.create');
  app.put('/vtask/users/:user_id/posts/:id', 'post.update');
  app.del('/vtask/users/:user_id/posts/:id', 'post.del');
  //task
  app.get('/vtask/task/findByUuid/:uuid', 'task.findByUuid');//返回任务详情页所需所有信息
  app.get('/vtask/task/findByUid/:id', 'task.findByUid');//用于首页获取用户参与的（创建+代办）、未完成的任务
  app.get('/vtask/task/myTask/:id', 'task.myTask');//用于搜索页面获取用户参与的所有任务包括已完成
  app.post('/vtask/task/add', 'task.add');//创建任务
  app.post('/vtask/task/updateByUuid', 'task.updateByUuid');//编辑任务  
  app.post('/vtask/task/deleteByUuid', 'task.deleteByUuid');//删除任务
  app.post('/vtask/task/search', 'task.search');//任务搜索
  //branch
  app.post('/vtask/branch/add', 'branch.add');//新增一个部门
  app.post('/vtask/branch/edit', 'branch.edit');//修改部门
  app.get('/vtask/branch/list', 'branch.list');//获取所有部门列表，用于团队选择和部门管理页面
  //user
  app.get('/vtask/user/login/:code', 'user.login');//用户登陆，返回该用户信息，用于判断改用户是否注册、审核等
  app.post('/vtask/user/register', 'user.register');//用户注册
  app.post('/vtask/user/edit', 'user.edit');//编辑用户信息、更改用户状态
  app.get('/vtask/user/findByOpenid/:id', 'user.findByOpenid');//获取用户信息，废弃
  app.get('/vtask/user/list', 'user.list');//获取用户列表，用于用户审核页面
  app.post('/vtask/user/executor', 'user.executor');//获取执行人列表,不包含自己，用于执行人选择页面
  //answer
  app.post('/vtask/answer/add', 'answer.add');//添加评论
  app.post('/vtask/answer/delete', 'answer.delete');//添加评论
  app.get('/vtask/answer/list/:uuid', 'answer.list');//获取指定任务下的所有评论
};