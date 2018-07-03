// pages/create/create.js
const app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uuid: '',
    title: '', //任务标题
    desc: '', //任务详情
    disabled: false,
    executor: '', //经办人
    executor_ids: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // options.id = 'id001' //测试用
    const navTitle = options.uuid ? '修改任务' : '新建任务'
    //设置页面标题
    wx.setNavigationBarTitle({
      title: navTitle
    })
    if (options.uuid) {
      // 根据id发送请求
      util.get(`vtask/task/findByUuid/${options.uuid}`).then((beans) => {
        console.log(beans);
        const { title, desc } = beans.task
        let executor = [], executor_ids = [];
        for (let i = 0; i < beans.executor.length; i++) {
          executor.push(beans.executor[i].name)
          executor_ids.push(beans.executor[i].id)
        }
        this.setData({
          uuid: options.uuid,
          title,
          desc,
          executor: executor.toString(),
          executor_ids: executor_ids.toString()
        })
      })
    }
  },
  // 选择经办人
  selectExecutor: function (e) {
    wx.navigateTo({
      // url: `/pages/executor/executor?userId=${data}`
      url: `/pages/executor/executor?executor_ids=${this.data.executor_ids}`
    })
  },
  confirmCreate() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  formSubmit(e) {
    const { title, desc, executor } = e.detail.value;
    if (title && desc && executor) {
      this.setData({
        disabled: true
      })
      let itemData = {
        title,
        desc,
        creater_id: app.globalData.user.id,
        executor_ids: this.data.executor_ids
      }
      console.log(itemData)
      let url = '', data = {};
      if (this.data.uuid) {
        url = 'vtask/task/updateByUuid'
        data.uuid = this.data.uuid
        data.data = itemData
      } else {
        url = 'vtask/task/add'
        data = itemData
      }
      console.log(url, data)
      util.post(url, data).then((beans) => {
        console.log(beans);
        wx.showToast({
          title: '成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      },(reg)=>{
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
        this.setData({
          disabled: false
        })
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none'
      })
    }
  }

})