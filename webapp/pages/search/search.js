// pages/search/search.js
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    noTaskText: ""
  },
  onShow: function (options) {
    this.init()
  },
  init() {
    const id = app.globalData.user.id;    
    //初始化的时候展示我参与的所有任何，包括未完成
    util.get('vtask/task/myTask/' + id).then((beans) => {
      const listData = [{
        title: '我创建的',
        data: beans.creat
      }, {
        title: '我参与的',
        data: beans.execute
      }];
      let noResult = true;
      for (let i = 0, len = listData.length;i<len;i++){
        if (listData[i].data.length > 0) {
          noResult = false;
        }
      }
      this.setData({
        listData,
        noTaskText:"您还没有参与任务呦",
        noResult
      })
    })
  },
  search(e) {
    const uid = app.globalData.user.id,
      key = e.detail.value;
    if (!key) { return; }
    wx.showLoading({
      title: '加载中',
    })
    util.post('vtask/task/search', { uid, key }).then((beans) => {
      const listData = [{
        title: '任务标题匹配',
        data: beans.titleArr
      }, {
        title: '任务内容匹配',
        data: beans.descArr
      }, {
        title: '参与人姓名匹配',
        data: beans.userArr
      }];
      let noResult = true;
      for (let i = 0, len = listData.length; i < len; i++) {
        if (listData[i].data.length > 0) {
          noResult = false;
        }
      }
      this.setData({
        listData,
        noTaskText: "没有符合条件的结果",
        noResult
      })
      wx.hideLoading()
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.init();
  }
})