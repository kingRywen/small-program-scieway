import { request } from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confName: '',
    articleLists:[],
    loading: true,
    indexNum: null
  },

  tap: function (e) {
    console.log(e)
    if (this.data.indexNum == e.currentTarget.dataset.index) {
      this.setData({
        indexNum: null
      })
    } else {
      this.setData({
        indexNum: e.currentTarget.dataset.index
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      confName: options.name
    })
    request('GET', '/api/Register/getConferenceArticle', null, res => {
      console.log(res)
      if (res.data && res.data.status == 200) {
        this.setData({
          articleLists: res.data.articleLists,
          loading:false
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