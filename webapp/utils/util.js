const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const get = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://www.zhaohaipeng.com/" + url,
      success: (res) => {
        const data = res.data;
        if (data.returnCode == 0) {
          resolve(data.beans)
        } else {
          reject(data)
        }
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}
const post = (url,data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://www.zhaohaipeng.com/" + url,
      method:"POST",
      data,
      success: (res) => {
        const data = res.data;
        if (data.returnCode == 0) {
          resolve(data.beans)
        } else {
          reject(data)
        }
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

module.exports = {
  formatTime,
  get,
  post
}
