// pages/route/route.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([app.login(), app.getUserInfo(), util.get("vtask/branch/list")]).then((v) => {
      const [user, userInfo, branchArray] = v;
      console.log(branchArray)
      console.log(userInfo)
      console.log(user)
      app.globalData.branchArray = branchArray;
      app.globalData.userInfo = userInfo;
      app.globalData.user = user;
      if (user.status == 1) {//正常用户
        if (options.uuid) {//由转发任务进入，跳转至任务页面
          wx.redirectTo({
            url: `/pages/detail/detail?uuid=${options.uuid}`
          })
        } else {//正常打开，进入首页
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      } else if (user.status == -1) {//未注册
        wx.navigateTo({
          url: `../userinfo/userinfo`
        })
      } else {//其它状态（正在审核，禁用等。）
        wx.navigateTo({
          url: `../userinfo/userinfo?abnormal=1`
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})