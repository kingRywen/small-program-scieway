var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["保一保", "稳一稳", "冲一冲"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    gaokaoData: null
  },
  onLoad: function () {
    wx.getStorage({
      key: 'gaokaoData',
      success: (res) => {
        console.log(JSON.parse(res.data))
        this.setData({
          gaokaoData: JSON.parse(res.data)
        })
      },
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onUnload: function () {
    wx.removeStorage({
      key: 'gaokaoData',
      success: function (res) {
        console.log(res.data);
      },
    })
  },
});