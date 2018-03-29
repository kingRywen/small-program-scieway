import {
  request
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    lists: []
  },
  
  getData: function (phone, fn) {
    // 查询文章 接口检查
    request('GET', '/api/Register/getArticle', { phone }, res => {
      console.log(res)
      if (res.data.lists) {
        fn(res.data.lists)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.phone)
    this.getData(options.phone, (lists) => {
      this.setData({
        lists: lists,
        loading: false,
      })
    })
  },

  sure: function(e) {
    console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.index
    // wx.navigateTo({
    //   url: `/pages/register/authorRegisterArticle/authorRegisterArticle?id=${e.currentTarget.dataset.id}`
    // })

    request('GET', '/api/Register/registerArticle', null, res => {
      console.log(res.data)
      if(res.data && res.data.result && res.data.result.code == 200) {
        wx.showModal({
          title: '注册成功，请出示给会议人员确认',
          content: `标题:${e.currentTarget.dataset.title}`,
        })
        let lists = this.data.lists
        lists[index].status = 1
        this.setData({
          lists: lists
        })
      } else {
        wx.showModal({
          title: '注册失败',
          content: `失败原因:${res.data.result.errMsg}`,
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