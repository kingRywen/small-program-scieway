import {
  request
} from '../../../utils/util.js'
import config from '../../../utils/config.js'
let amapFile = require('../../../utils/amap-wx.js')
let myAmapFun = new amapFile.AMapWX({ key: config.godKey })

let callbackSet

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    lists: [],
    title: '',
    origin: [],
    
  },
  
  getData: function (phone, fn) {
    // 查询文章 接口检查
    request('GET', '/api/Register/getArticle', { phone }, res => {
      console.log(res)
      if (res.data.lists) {
        this.setData({
          loading: false
        })
        if (callbackSet) {
          callbackSet(res.data.lists)
        }
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
        title: options.phone + '的文章'
      })
    })

    // 定位位置
    myAmapFun.getRegeo({
      success: (data) => {
        //成功回调
        console.log(data)
        let lists = this.data.lists

        if (data && data.length) {
          // 作者的坐标
          let origin = data[0].longitude + ',' + data[0].latitude
          this.setData({
            origin: origin
          })
          
          // 设置距离显示
          if(!this.data.loading) {
            this.setLocation(lists, origin)
          } else {
            callbackSet = (lists, origin) => {
              this.setLocation.call(this, arguments)
            }
          }
          
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

  showMap: function (e) {
    wx.navigateTo({
      url: `/pages/register/conferenceNav/conferenceNav?pos=${e.currentTarget.dataset.location}`,
    })
  },

  // // 关闭地图
  // closeMap: function () {
  //   this.setData({
  //     mapOpened: false
  //   })
  // },

  // 设置显示距离
  setLocation: function (lists, origin) {
    lists.forEach((el, i, arr) => {
      if (!el.location) return
      myAmapFun.getDrivingRoute({
        origin: origin,
        destination: el.location,
        success: (res) => {
          if (!res.paths.length) {
            return el.distance = '未知距离'
          }
          el.distance = Math.ceil(res.paths[0].distance / 100) / 10 + 'km'
          this.setData({
            lists: arr
          })
        }
      })
    })
  },

  sure: function(e) {
    console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.index



    request('GET', '/api/Register/registerArticle', null, res => {
      console.log(res.data)
      if(res.data && res.data.result && res.data.result.code == 200) {
        wx.showModal({
          title: '注册成功，请出示给会议人员确认',
          content: `标题:${e.currentTarget.dataset.title}`,
          showCancel: false
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
          showCancel: false
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