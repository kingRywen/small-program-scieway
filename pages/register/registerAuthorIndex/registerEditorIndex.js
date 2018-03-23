// pages/register/registerEditorIndex.js
import { request } from '../../utils/util.js'
import config from '../../utils/config.js'
let isAuth;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: null,
    isAuth: false,
    confLists: []
  },
  /**
   * 添加会议
   */
  addConference: function () {
    wx.navigateTo({
      url: '',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('加载')
    // 通过session获取该用户所拥有的会议
    request('GET', `/api/Register/ChangeArticleState/${wx.getStorageSync('sessionID')}`, null, (res) => {
      console.log(res)
      // 有会议权限
      let status = res.data.status
      if (status && status == 200) {
        this.setData({
          isAuth: true,
          loading: true,
          confLists: res.data.conferenceLists
        })
      } else {
        // 没有权限
        this.setData({
          loading: true
        })
      }

    }, {auth: 123}) // 测试
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