// component/litask/litask.js
const app = getApp()
const util = require('../../utils/util.js');
const itemMap = {
  0: [],//我的代办
  1: ['删除', '编辑'],//我的创建
  2: ['删除']//搜索
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    liData: {
      type: Array,
      value: []
    },
    liType: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    longpress(e) {
      const uuid = e.currentTarget.dataset.uuid
      const creater_id = e.currentTarget.dataset.creater_id
      if (this.data.liType != 0 && creater_id == app.globalData.user.id) {
        let that = this;
        wx.showActionSheet({
          itemList: itemMap[this.data.liType],
          success: function (res) {
            console.log(res.tapIndex)
            if (res.tapIndex == 0) {
              //删除任务
              wx.showModal({
                title: '警告',
                content: '确定要删除该任务吗？',
                success: function (res) {
                  if (res.confirm) {
                    that.deleteItem(uuid)
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              //编辑任务
              that.editItem(uuid)
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
      }
    },
    //跳转到详情
    toDetail(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?uuid=${e.currentTarget.dataset.uuid}`
      })
    },
    //删除方法
    deleteItem(uuid) {
      let data = { uuid: uuid }
      util.post("vtask/task/deleteByUuid", data).then((beans) => {
        console.log(beans)
        getCurrentPages()[0].onShow()
      }, () => {
        wx.showModal({
          title: '提示',
          content: '删除失败'
        })
      })
    },
    //修改任务
    editItem(uuid) {
      wx.navigateTo({
        url: `/pages/create/create?uuid=${uuid}`
      })
    }
  }
})
