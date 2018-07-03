// pages/detail/detail.js
const app = getApp()
const util = require('../../utils/util.js');
let uuid = '';
const buttonMap = {
  1: {
    disabled: true,
    text: '已完成'
  },
  0: {
    disabled: false,
    text: '完成任务'
  },
  '-1': {
    disabled: true,
    text: '无权操作'
  }
}
Page({
  data: {
    creator: {},//创建人
    executor: [],//执行人
    unable:true,
    task: {},
    showComment: false,
    popup: {},
    comments: []
  },
  onLoad: function (options) {
    if (options.uuid) {
      uuid = options.uuid
      util.get(`vtask/task/findByUuid/${uuid}`).then((beans) => {
        let unable = false
        const nuid = app.globalData.user.id
        console.log(beans.executor)
        //判断按钮状态
        if (nuid == beans.creater.id) {
          unable = true;
        } else {
          for (let i = 0; i < beans.executor.length; i++) {
            if (nuid == beans.executor[i].id) {
              unable = true;
              break;
            }
          }
        }
        console.log(unable)
        this.setData({
          creator: beans.creater,
          executor: beans.executor,
          task: beans.task,
          okButton: buttonMap[beans.task.status],
          unable
        })
      })
      this.initComments()
    }
  },
  onReady: function () {
    this.popup = this.selectComponent('#popup')
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    return {
      title: this.data.task.title,
      path: `/pages/route/route?uuid=${uuid}`,
      success: function (res) {
        // 转发成功
        console.log('转发成功')
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  showPopupCreator: function (e) {
    this.setData({
      popup: this.data.creator
    })
    this.popup.showPopup()
  },
  initComments() {
    util.get(`vtask/answer/list/${uuid}`).then((beans) => {
      let comments = [];
      for (let i = 0; i < beans.length; i++) {
        let item = {
          avatarurl: beans[i].user.avatarurl,
          name: beans[i].user.name,
          relativeTime: beans[i].answer.relativeTime,
          content: beans[i].answer.content,
          id: beans[i].answer.id,//评论id
          uid: beans[i].answer.uid//评论人id
        }
        comments.push(item)
      }
      console.log(comments)
      this.setData({
        comments
      })
    })
  },
  showPopupExecutor: function (e) {
    let popup = this.data.executor[e.target.dataset.index]
    console.log(popup)
    this.setData({
      popup: popup
    })
    this.popup.showPopup();
  },
  goComment() {
    this.setData({
      showComment: true
    })
  },
  bindComplate() {
    let data = {
      status: 1
    }
    console.log(uuid)
    util.post('vtask/task/updateByUuid', { uuid, data }).then((beans) => {
      wx.showToast({
        title: '成功',
        icon: 'success'
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)

    })

  },
  formSubmit(e) {
    let item = e.detail.value.comments;
    console.log(item)
    if (item) {
      let data = {
        tuuid: uuid,
        uid: app.globalData.user.id,
        content: item
      }
      util.post('vtask/answer/add', data).then((beans) => {
        beans.avatarurl = app.globalData.user.avatarurl
        beans.name = app.globalData.user.name
        console.log(beans)
        let comments = this.data.comments;
        comments.push(beans)
        this.setData({
          comments
        })
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 500
        })
      })
    }
    this.setData({
      showComment: false
    })
  },
  longpressAnswer(e) {
    const uid = e.currentTarget.dataset.uid;
    console.log(uid)
    console.log(app.globalData.user.id)
    if (uid == app.globalData.user.id) {
      const id = e.currentTarget.dataset.id;
      let that = this
      wx.showActionSheet({
        itemList: ['删除'],
        success: function (res) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            util.post("vtask/answer/delete", { id }).then((beans) => {
              console.log(beans);
              that.initComments()
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500
              })
            }, () => {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 1500
              })
            })
          }
        }
      })
    }
  },
  editTask() {
    if (this.data.creator.id == app.globalData.user.id) {
      wx.navigateTo({
        url: `/pages/create/create?uuid=${uuid}`
      })
    }
  },
  cancel() {
    this.setData({
      showComment: false
    })
  },
  unableMsg(){
    wx.showToast({
      title: '抱歉！非参与人员无权操作！',
      icon: 'none',
      duration: 1000
    })
  }
})