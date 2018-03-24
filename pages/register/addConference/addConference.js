import { formatTime } from '../../../utils/util.js'
import { request } from '../../../utils/util.js'

let app = getApp()
let markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    now: formatTime(new Date(), 1),
    mapOpened: false,
    regionStr: '',
    location: ''
  },

  // 关闭地图
  closeMap: function () {
    this.setData({
      mapOpened: false
    })
  },

  uploadExcel: function () {

  },

  getaddress: function (e) {
    console.log(e)
    this.setData({
      regionStr: e.detail.desc,
      location: e.detail.location,
      mapOpened: false,

    })
    
  },

  formSubmit: function (e) {
    for(var i in e.detail.value) {
      if(e.detail.value[i] == '') {
        wx.showToast({
          title: '请填写完整信息',
          mask:true,
          icon: 'none'
        })
        return
      }
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    request('POST', '/api/Register/ApplyConference', { ...e.detail.value }, (res)=> {
      console.log(res)
    })
  },

  getMap: function () {
    this.setData({
      mapOpened: true
    })
  },

  

  resetTime: function (e) {
    console.log(1)
    let changevalue = e.target.dataset.changevalue
    if (changevalue == 'endTime') {
      this.setData({
        endTime: this.data.startTime
      })
    }
  },

  bindTimeChange: function (e) {
    console.log(e)
    let changevalue = e.target.dataset.changevalue
    this.setData({
      [changevalue]: e.detail.value
    })
    console.log(this.data.startTime > this.data.endTime)
    if (this.data.startTime > this.data.endTime && changevalue == 'startTime') {
      this.setData({
        endTime: ''
      })
    }
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