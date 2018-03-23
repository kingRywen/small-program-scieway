//app.js
import config from './utils/config.js'
App({
  onLaunch: function () {
    if (wx.getSystemInfoSync().SDKVersion < '1.7.0') {
      wx.showModal({
        title: '注意',
        content: '你的微信SDK版本号太低，可能会影响正常使用，请升级你的微信版本后再试',
        success: function(res) {
          
        }
      })
    }
    wx.showLoading({
      title: '登录中',
      mask:true
    })
    // 登录
    wx.login({
      success: res => {
        console.log('code: ', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${config.host}/api/Register?code=${res.code}`,
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res.data)
            // 将后台的session存入storage备用
            wx.setStorageSync('sessionID', res.data)
            this.globalData.sessionID = res.data
            wx.hideLoading()
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionID: null,
    isAuth: null
  }
})