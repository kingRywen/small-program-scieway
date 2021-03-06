import {
  request
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: ''
  },

  search: function () {
    let input = this.data.input.trim()
    if(!input && input !== 0) {
      console.log('空2')
      this.setData({
        input: ''
      })
      wx.showToast({
        title: '请输入号码',
        mask: true,
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/register/articlesByPhone/articlesByPhone?phone=${this.data.input}`,
    })
    
  },

  bindKeyInput: function (e) {
    this.setData({
      input: e.detail.value
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})