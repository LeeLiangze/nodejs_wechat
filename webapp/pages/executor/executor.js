// pages/executor/executor.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let param_ids = options.executor_ids || '';
    let param_arr = param_ids.split(',')
    let data = { id: app.globalData.user.id },
      list = [];
    util.post("vtask/user/executor", data).then((beans) => {
      for (let i = 0; i < beans.length; i++) {
        let branchs = {
          branch: beans[i].branch,
          open: false,
          users: []
        };
        for (var j = 0; j < beans[i].users.length; j++) {
          let checked = false;
          if (param_ids) {
            if (param_arr.indexOf(beans[i].users[j].id.toString()) != -1) {
              checked = true
            }
          }
          let user = {
            id: beans[i].users[j].id,
            name: beans[i].users[j].name,
            avatarurl: beans[i].users[j].avatarurl,
            checked
          }
          branchs.users.push(user)
        }
        list.push(branchs)
      }
      list[0].open = true
      console.log(list)
      this.setData({
        list: list
      })
    })

  },
  executorToggle: function (e) {
    let index = e.currentTarget.dataset.index,
      list = this.data.list;
    list[index].open = !list[index].open
    this.setData({
      list
    });
  },
  ok: function () {
    let list = this.data.list;
    let executor_ids = [],
      executor_name = []
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].users.length; j++) {
        if (list[i].users[j].checked) {
          executor_ids.push(list[i].users[j].id)
          executor_name.push(list[i].users[j].name)
        }
      }
    }
    console.log(executor_ids)
    console.log(executor_name)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      executor: executor_name.toString(), //经办人
      executor_ids: executor_ids.toString()
    })
    wx.navigateBack({
      delta: 1
    })
  },
  checkboxChange: function (e) {
    let idx = e.currentTarget.dataset.idx;
    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    // let list_id = [], list_name = [];
    list[idx].users[index].checked = !list[idx].users[index].checked
    this.setData({
      list
    })
    // checkAll_id[idx] = list_id
    // checkAll_name[idx] = list_name
  }
})