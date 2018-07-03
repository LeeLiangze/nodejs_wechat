// pages/pops.js
Component({
  options: {
    // multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: ''
    },
    width:{
      type: Number,
      value:500
    },
    top:{
      type:String,
      value:'center'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗显示控制
    hidden: true
  },
  attached:function(){
  // console.log(this.data)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup() {
      this.setData({
        hidden: true
      })
    },
    //展示弹框
    showPopup() {
      this.setData({
        hidden: false
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})
