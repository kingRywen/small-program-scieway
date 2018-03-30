import WxTouchEvent from "../../utils/touch.js"
const utils = require('../../utils/util.js')

const app = getApp()

// 初始化手势库
let infoListTouchEvent = new WxTouchEvent()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: ['/assets/images/banner_01.jpg', '/assets/images/banner_02.jpg'],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    animationStyle: null,
    currentIndex: 0,
    load: true,
    tabNavs: [
      {
        img: '/assets/fonts/icon1.svg',
        name: '会议签到',
        navUrl: '/pages/register/register'
      },
      {
        img: '/assets/fonts/icon2.svg',
        name: '兼职投稿',
        navUrl: '/pages/partTimeJob/index/index'
      },
      {
        img: '/assets/fonts/icon3.svg',
        name: '高考查询',
        navUrl: "/pages/gaokao/index/index"
      },
      {
        img: '/assets/fonts/icon4.svg',
        name: '搜索文章',
        navUrl: '/pages/logs/logs'
      },
    ],
    mainNavs: [
      {
        img: '/assets/fonts/hot.svg',
        name: '热点关注'
      },
      {
        img: '/assets/fonts/dot2.svg',
        name: '学术天地'
      },
      {
        img: '/assets/fonts/dot3.svg',
        name: '关于我们'
      },
    ],
    articleLists: [
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
      {
        img: '/assets/images/articleImage.jpg',
        title: '毕业典礼上被要求配合求婚怎么办?',
        subtitle: '当然是选择祝福啦'
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toggle: function (e) {
    console.log(e)
    // 点击后就去请求获取数据
    this.setData({
      load: false
    })
    utils.request('GET', '/api/Global/GetMessageList', {
      offset: 0,
      count: 20
    }, (res) => {
      console.log(res.data)
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        load: true
      })
    })
    
  },
  onLoad: function () {
    // 把实例化的手势函数绑定到页面实例的属性
    this.infoListTouchEvent = infoListTouchEvent
    this.infoListTouchEvent.bind({//初始化后绑定事件
      swipe: (e) => {
        console.log(e);
        // 如果滑动的是切换页
        if (e.currentTarget.id === 'tab') {
          console.log('我要滑动tab')
        }
        // 下滑
        if (e.direction === 'Up') {
          console.log('下滑')
          
          if (!this.data.animationStyle) {
            utils.domSelect('.ani', (res) => {
              console.log(res)
              this.setData({
                animationStyle: {
                  scrollH: res[0][0].height + res[0][1].height,
                  height: '0'
                }
              })
            })
          }
        }
        if (e.direction === 'Down') {
          console.log('上滑')
          if (this.data.animationStyle) {
            this.setData({
              animationStyle: null
            })
          }
        }
      },
      // pressMove: (e) => {
      //   console.log(e.deltaY)
      //   if (!this.data.animationStyle) {
      //     domSelect('#swiper', (res) => {
      //       console.log(res[0].height)
      //       this.setData({
      //         animationStyle: {
      //           height: res[0].height,
      //           defaultHeight: res[0].height
      //         }
      //       })
      //     })
      //   } else {
      //     const _height = this.data.animationStyle.height
      //     if(_height < 0) return
      //     this.setData({
      //       animationStyle: {
      //         // transform: 'translate3d(0, 0, 0) scale(0)',
      //         height: _height + e.deltaY * 20 < 0 ? 0 : ((_height + e.deltaY) > this.data.animationStyle.defaultHeight ? this.data.animationStyle.defaultHeight : (_height + e.deltaY)),
      //         defaultHeight: this.data.animationStyle.defaultHeight
      //       }
      //     })
      //   }
      // },
      doubleTap: function (e) {
        console.log(e);
      },
      // tap: function (e) {
      //   console.log(e);
      // }.bind(this),
      longTap: function (e) {
        console.log(e);
      },
      rotate: function (e) {
        console.log(e)
      }.bind(this),
      pinch: function (e) {
        console.log(e);
      }

    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  touchStart: infoListTouchEvent.start.bind(infoListTouchEvent),
  touchMove: infoListTouchEvent.move.bind(infoListTouchEvent),
  touchEnd: infoListTouchEvent.end.bind(infoListTouchEvent),
  touchCancel: infoListTouchEvent.cancel.bind(infoListTouchEvent),
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
