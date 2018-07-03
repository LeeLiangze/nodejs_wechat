// pages/userinfo/userinfo.js
const buttonMap = {
  '-1': {
    text: '注册',
    disabled: false
  },
  0: {
    text: '正在审核',
    disabled: true
  },
  1: {
    text: '保存',
    disabled: false
  },
  2: {
    text: '审核未通过',
    disabled: true
  },
  3: {
    text: '账号被禁用',
    disabled: true
  }
}
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    button: {
      text: '注册',
      disabled: true
    },
    branchArray: [],//部门
    branchIndex: -1
  },
  //picker改变时触发
  bindPickerChange: function (e) {
    this.setData({
      branchIndex: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let navTitle;
    if (options.abnormal == '1') {
      //设置页面标题
      navTitle = '修改信息'
      
      for (let i = 0; i < app.globalData.branchArray.length; i++) {
        if (app.globalData.user.branch_id == app.globalData.branchArray[i].id) {
          app.globalData.branchIndex = i;
          break;
        } else {
          app.globalData.branchIndex = -1;
        }
      }
      this.setData({
        user: app.globalData.user,
        branchArray: app.globalData.branchArray,
        branchIndex: app.globalData.branchIndex,
        button: buttonMap[app.globalData.user.status]
      })
    } else {
      navTitle = '注册账号'
      this.setData({
        branchArray: app.globalData.branchArray,
        branchIndex: -1,
        button: buttonMap[app.globalData.user.status]
      })
    }
    wx.setNavigationBarTitle({
      title: navTitle
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formSubmit: function (e) {
    const { name, tel, email } = e.detail.value;
    const index = this.data.branchIndex;
    if (name && tel && email && index != -1) {
      const { id: branch_id, branch } = this.data.branchArray[index]
      const data = {
        openid: app.globalData.user.openid,
        name,
        tel,
        email,
        branch_id,
        branch,
        avatarurl: app.globalData.userInfo.avatarUrl
      }
      console.log(data);
      const globalUser = app.globalData.user
      if (globalUser.status == 1) {
        util.post('vtask/user/edit', { id: globalUser.id, data }).then((beans) => {
          console.log(beans)
          if (beans != 0) {
            app.globalData.branchIndex = this.data.branchIndex
            app.globalData.user = beans
            wx.showToast({
              title: '成功',
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      } else {
        util.post('vtask/user/register', data).then((beans) => {
          console.log(beans)
          this.setData({
            button: buttonMap[beans.status],
          })
        })
      }
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none'
      })
    }

  }

})