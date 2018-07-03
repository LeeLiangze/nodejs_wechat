// pages/audit/audit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomActive: 0,
    stateActive: 0,
    wait: [],
    normal: [],
    reject: [],
    branchGroup: [],
    branchGroupStatus: {},
    addGroupInput: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const wait = [{
      id: 2,
      name: '大团长2',
      tel: '15736711111',
      email: '23423423432@qq.com',
      branch: '前端组',
      avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/fEIYRCQO0LR6JiaWK7zw02dYMfTgHsGg70082hHdvgbNZaLTpYnzyGVeVHr2UydhSVVjsiaFSuKTIcrC1QG34L6w/0",
      status: 0
    }, {
      id: 3,
      name: '大团长3',
      tel: '15736711111',
      email: '23423423432@qq.com',
      avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/fEIYRCQO0LR6JiaWK7zw02dYMfTgHsGg70082hHdvgbNZaLTpYnzyGVeVHr2UydhSVVjsiaFSuKTIcrC1QG34L6w/0",
      branch: '前端组',
      status: 0
    }
    ]
    const normal = [{
      id: 4,
      name: '大团长4',
      tel: '15736711211',
      email: '2343432@qq.com',
      branch: '前端组',
      avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/fEIYRCQO0LR6JiaWK7zw02dYMfTgHsGg70082hHdvgbNZaLTpYnzyGVeVHr2UydhSVVjsiaFSuKTIcrC1QG34L6w/0",
      status: 0
    }, {
      id: 5,
      name: '大团长5',
      tel: '15736711121',
      email: '23423432@qq.com',
      branch: '前端组',
      avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/fEIYRCQO0LR6JiaWK7zw02dYMfTgHsGg70082hHdvgbNZaLTpYnzyGVeVHr2UydhSVVjsiaFSuKTIcrC1QG34L6w/0",
      status: 0
    }
    ]
    const reject = [{
      id: 6,
      name: '大团长6',
      tel: '15736711111',
      email: '23423423432@qq.com',
      branch: '前端组',
      avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/fEIYRCQO0LR6JiaWK7zw02dYMfTgHsGg70082hHdvgbNZaLTpYnzyGVeVHr2UydhSVVjsiaFSuKTIcrC1QG34L6w/0",
      status: 0
    }, {
      id: 7,
      name: '大团长7',
      tel: '15736711111',
      email: '23423423432@qq.com',
      branch: '前端组',
      avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/fEIYRCQO0LR6JiaWK7zw02dYMfTgHsGg70082hHdvgbNZaLTpYnzyGVeVHr2UydhSVVjsiaFSuKTIcrC1QG34L6w/0",
      status: 0
    }
    ]
    const branchGroup = [{
      "id": 1,
      "branch": "前端组"
    },
    {
      "id": 2,
      "branch": "视觉组"
    },
    {
      "id": 3,
      "branch": "IT系统部"
    },
    {
      "id": 4,
      "branch": "测1啊啊啊"
    }]
    const branchGroupStatus = {};
    for (let i = 0; i < branchGroup.length; i++) {
      branchGroupStatus[branchGroup[i].id] = true;
    }
    console.log(branchGroupStatus)
    this.setData({
      wait: wait,
      normal: normal,
      reject: reject,
      branchGroup: branchGroup,
      branchGroupStatus: branchGroupStatus
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent('#popup')
  },
  changeBottomBar: function (e) {
    if (e.currentTarget.dataset.item != this.data.bottomActive) {
      this.setData({
        bottomActive: e.currentTarget.dataset.item
      })
    }
  },
  changeStateBar: function (e) {
    if (e.target.dataset.item != this.data.stateActive) {
      this.setData({
        stateActive: e.target.dataset.item
      })
    }
  },
  changeStatus: function (e) {
    let id = e.target.dataset.id;
    let btnType = e.target.dataset.type;
    let option;
    if (btnType == 0) {
      option = ['通过', '拒绝']
    } else if (btnType == 1) {
      option = ['启用', '禁用']
    } else {
      option = ['通过', '拒绝']
    }

    wx.showActionSheet({
      itemList: option,
      success: function (res) {
        console.log(res)
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  changeBranch: function (e) {
    console.log(e.target.dataset.id)
    let branchGroupStatus = this.data.branchGroupStatus;
    branchGroupStatus[e.target.dataset.id] = !branchGroupStatus[e.target.dataset.id]
    this.setData({
      branchGroupStatus: branchGroupStatus
    })
  },
  addOne: function () {
    this.setData({
      addGroupInput: true
    })
    this.popup.showPopup()
  },
  addOk: function () {
    this.popup.hidePopup()
  }
})