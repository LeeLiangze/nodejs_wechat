//app.js
const util = require('utils/util.js');
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null
  },
  login() {
    return new Promise((resolve) => {
      // 登录
      wx.login({
        success: res => {
          console.log(res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          util.get("vtask/user/login/" + res.code).then((beans) => {
            resolve(beans);
          })
        }
      })
    })
  },
  getUserInfo() {
    return new Promise((resolve) => {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              resolve(res.userInfo)
            }
          })
        }
      })
    })
  }
})