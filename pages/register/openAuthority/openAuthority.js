import { request } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    trueName: '',
    companyName: '',
    error: false,
    info: '',
    isActive: false,
    link: '/pages/register/registerEditorIndex/registerEditorIndex',
    loading: true
  },

  checkName: function (e) {
    this.setData({
      trueName: e.detail.value
    })
    if(this.data.trueName && this.data.companyName) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  checkCompany: function (e) {
    this.setData({
      companyName: e.detail.value
    })
    if (this.data.trueName && this.data.companyName) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showLoading({
      mask:true
    })
    request('GET', `/api/Register/ApplyConfRank`, {
      session: wx.getStorageSync('sessionID'),
      name: e.detail.value.trueName,
      company: e.detail.value.companyName,
    }, (res) => {
      wx.hideLoading()
      if(res.data.code == 200) {
        this.setData({
          info: '您已申请会议权限，请等待审核结果',
          isActive: true
        })
      } else {
        this.setData({
          error: true,
          isActive: true,
          info: res.data.errorMsg
        })
      }
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
    console.log('show')
    // 检查是否有申请过
    request('GET', `/api/Register/Reply`, null, (res) => {
      console.log(res)
      if(res.data.code == 200) {
        this.setData({
          loading: false,
          isActive: true,
          info: '您已申请会议权限，请等待审核结果',
        })
      } else {
        this.setData({
          loading: false,
        })
      }
    })
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