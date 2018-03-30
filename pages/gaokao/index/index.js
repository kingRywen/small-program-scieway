import provinces from '../../../utils/province.js'
import { request } from '../../../utils/util.js'
console.log(provinces)
let timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['文科', '理科'],
    index: null,
    indexR: null,
    region: provinces,
    isNav: true,
    animation: {
      inputWrapperController: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindPickerChange: function (e) {
    console.log(e)
    let name = e.currentTarget.dataset.name
    this.setData({
      [name]: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  tap: function () {
    this.setData({
      animation: {
        inputWrapperController: true
      }
    })
  },

  cancel: function () {
    clearTimeout(timer)
    this.setData({
      animation: {
        inputWrapperController: false,
        isNav: false
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // 验证
    // for (const key in e.detail.value) {
    //   if (e.detail.value.hasOwnProperty(key)) {
    //     const element = e.detail.value[key];
    //     if (!element) {
    //       wx.showToast({
    //         title: '请填好完整的信息',
    //         icon: 'none'
    //       })
    //     }
    //   }
    // }
    
    // 开始查询
    
    this.setData({
      animation: {
        inputWrapperController: true
      }
    })

    request('GET', '/api/gaokao/getSchool', null, res => {
      console.log(res)
      if (!this.data.isNav) {
        return
      }
      if (this.data.isNav) {
        timer = setTimeout(() => {
          wx.setStorage({
            key: 'gaokaoData',
            data: JSON.stringify(res.data),
          })
          wx.navigateTo({
            url: '/pages/gaokao/result/result',
          })
        }, 2000)
        
      }
    })

  },

  choose: function (e) {
    console.log(e)

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
    this.setData({
      array: ['文科', '理科'],
      index: null,
      indexR: null,
      region: provinces,
      isNav: true,
      animation: {
        inputWrapperController: false
      }
    })
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