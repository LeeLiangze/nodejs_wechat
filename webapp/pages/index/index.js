//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    user: {},
    creatList: [],
    executeList: [],
    noTaskText: "您还没有收到任务呦",
    activeItem: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: `../userinfo/userinfo?abnormal=1`
    })
  },
  changeListBar(e) {
    let texts = ["您还没有收到任务呦", "您还没有创建任务呦"],
      index = e.target.dataset.item;
    this.setData({
      activeItem: index,
      noTaskText: texts[index]
    })
  },
  addOne() {
    wx.navigateTo({
      url: '../create/create'
    })
  },
  init:function(){
    util.get(`vtask/task/findByUid/${app.globalData.user.id}`).then((beans) => {
      this.setData({
        creatList: beans.creat,
        executeList: beans.execute
      })
    })
  },
  onShow(){
    this.init();
  },
  onLoad: function () {
    this.setData({
      user: app.globalData.user
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.init();
  }
})
