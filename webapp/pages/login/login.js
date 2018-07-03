// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 判断按钮是否可用
  buttonState: function () {
    if (this.data.username && this.data.password) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  login: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration:1000
    })
    setTimeout(function(){
        wx.navigateTo({
          url: '/pages/audit/audit'
        })
    },1000)
    
  },
  inputing: function (e) {
    console.log(e.target.id)
    if (e.target.id == 'username') {
      this.setData({
        username: e.detail.value
      })
    } else if (e.target.id == 'password') {
      this.setData({
        password: e.detail.value
      })
    }
    this.buttonState();
  }
})