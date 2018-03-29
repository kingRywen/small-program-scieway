import config from '../../../utils/config.js'
let amapFile = require('../../../utils/amap-wx.js')
let myAmapFun = new amapFile.AMapWX({ key: config.godKey })

Page({

  /**
   * 页面的初始数据
   */
  data: {
    origin: '',
    confLocation: '',
    lines: [{ name: '驾车', type: 0 }, { name: '步行', type: 1 }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.pos)
    this.setData({
      confLocation: options.pos
    })
    // 定位位置
    myAmapFun.getRegeo({
      success: (data) => {
        //成功回调
        console.log(data)
        if (data && data.length) {
          // 作者的坐标
          let origin = data[0].longitude + ',' + data[0].latitude
          this.setData({
            origin: origin
          })
        }
      },
      fail: function (info) {
        //失败回调
        console.log(info)
        wx.showModal({
          title: '注意',
          content: JSON.stringify(info),
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})