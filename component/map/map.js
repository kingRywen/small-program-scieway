import { debounce } from '../../utils/util.js'
import config from '../../utils/config.js'
import city from '../../utils/citycode.js'

let amapFile = require('../../utils/amap-wx.js');
let markersData;
let myAmapFun = new amapFile.AMapWX({ key: config.godKey });

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    confLocation: {
      type: String,
      value: null,
      observer: function (n, o) {
        console.log(n, o)
        this.getLine(n, 0)
      }
    },
    lines: {
      type: Array,
      value: null,
      observer: function (n, o) {
        console.log(n, o)
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    region: ['','',''],
    province: '',
    searchWord: '',
    cityCode: '',
    searchResults: [],
    showMap: true,
    showInfo: false,
    markers: [],
    textData: {
      name: '',
      desc: ''
    },
    index: 0
  },
  attached: function() {
    this.getLocation()
  },
  methods: {
    cancel: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancel', myEventDetail, myEventOption)
      this.resetMap()
      this.getLocation()
    },

    // 确认地址
    setDesc: function () {
      var myEventDetail = {
        desc: this.data.textData.desc,
        location: this.data.textData.location
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('setDesc', myEventDetail, myEventOption)
    },
    
    // 重置地图
    resetMap: function() {
      this.setData({
        region: ['', '', ''],
        province: '',
        searchWord: '',
        cityCode: '',
        searchResults: [],
        showMap: true,
        showInfo: false,
        markers: [],
        textData: {
          name: '',
          desc: ''
        },
        distance: '',
        cost: '',
        polyline: [],
        points: []
      })
      
    },

    showLine: function (e) {
      this.setData({
        index: e.currentTarget.dataset.i
      })
      console.log(this.properties.confLocation,e.currentTarget.dataset.type);
      this.getLine(this.properties.confLocation, e.currentTarget.dataset.type)
    },

    // 计算路线 0驾车，1步行，2 公交，3骑行
    // pos 会议地点
    getLine: function(pos, type) {
      this.resetMap()
      switch (type) {
        case 0:
          this.setCarLine(pos, type)
          break;
        case 1:
          this.setWalkLine(pos, type)
          break;
        case 2:
          
          break;
      
        default:
          break;
      }
    },

    // 驾车
    setCarLine: function (pos, type) {
      var that = this
      this.getLocation(data1 => {
        myAmapFun.getDrivingRoute({
          origin: data1[0].longitude + ',' + data1[0].latitude,
          destination: pos,
          // destination: "113.930532,22.513046",
          success: function (data) {
            console.log(data)
            var points = [];
            var markers = [{
              latitude: data1[0].latitude,
              longitude: data1[0].longitude,
            },{
              latitude: pos.split(',')[1],
              longitude: pos.split(',')[0],
            }]
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }

              let point = [data1[0].longitude + ',' + data1[0].latitude, pos]
              console.log(point)
              that.setData({
                points: point,
                markers: markers
              })
            }
            that.setData({
              
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });

          },
          fail: function (info) {
            console.log(info)
          }
        })
      })
    },

    // 步行
    setWalkLine: function (pos, type) {
      console.log(pos);
      var that = this
      this.getLocation(data1 => {
        myAmapFun.getWalkingRoute({
          origin: data1[0].longitude + ',' + data1[0].latitude,
          destination: pos,
          // destination: "113.930532,22.513046",
          success: function (data) {
            console.log(data)
            if (!data.paths) {
              wx.showToast({
                title: data.info
              })
            }
            var markers = [{
              latitude: data1[0].latitude,
              longitude: data1[0].longitude,
            }, {
              latitude: pos.split(',')[1],
              longitude: pos.split(',')[0],
            }]
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
              
              let point = [data1[0].longitude + ',' + data1[0].latitude, pos]
              console.log(point)
              that.setData({
                points: point,
                markers: markers
              })
            }
            that.setData({
              
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });

          },
          fail: function (info) {
            console.log(info)
          }
        })
      })
    },

    


    getLocation: function(fn) {
      // 调用高德地图APi
      var that = this
      console.log(this)

      // 定位位置
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          console.log(data)
          if(fn){
            return fn(data)
          }

          if (data && data.length) {
            that.setData({
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              province: data[0].regeocodeData.addressComponent.city,
              cityCode: data[0].regeocodeData.addressComponent.citycode,
            })
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

    // 搜索后点击定位
    bindSearch: function (e) {
      var dataset = e.currentTarget.dataset
      console.log(dataset.location, this.data.searchWord)
      var location = dataset.location;
      
      myAmapFun.getRegeo({
        location: location,
        // iconPath: "/assets/fonts/location_select.svg",
        // iconWidth: 30,
        success: (data) => {
          console.log(data)
          markersData = [{
            id: data[0].id,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            iconPath: data[0].iconPath,
            width: data[0].width,
            height: data[0].height,
            callout: {
              content: dataset.name,
              display: 'ALWAYS',
              fontSize: 20,
              padding: 3,

            }
          }]

          this.setData({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            province: data[0].regeocodeData.addressComponent.city,
            cityCode: data[0].regeocodeData.addressComponent.citycode,
            showMap: true,
            showInfo: true,
            markers: markersData,
            textData: {
              name: dataset.name,
              desc: dataset.address,
              location: dataset.location
            }
          })
          console.log(this.data.textData)
        }
      })
      
    },

    // 输入框搜索
    search: debounce(500, function(e){
      this.setData({
        searchWord: e.detail.value
      })
      myAmapFun.getInputtips({
        keywords: e.detail.value,
        city: this.data.cityCode,
        citylimit: true,
        success: (data) => {
          console.log(data)
          if (data && data.tips) {
            this.setData({
              searchResults: data.tips,
              showMap: false
            })
          }
        }
      })
    }),

    // 平移事件
    mapRegionchange: function (e) {
      console.log(e)
    },

    /**
     * 选择城市
     */
    bindRegionChange: function (e) {
      console.log(e)
      var value = e.detail.value
      var cityName = value[0].indexOf('市') > -1 ? value[0] : value[1]
      var cityCode = ''
      for(var key in city) {
        if(city[key].name == cityName) {
          cityCode = key
          break
        }
      }
      console.log(cityName, cityCode)
      if(value[0].indexOf('市')> -1) {
        this.setData({
          province: value[0]
        })
      } else {
        this.setData({
          province: value[1]
        })
      }
      this.setData({
        region: value,
        cityCode
      })
    },

    
  }
})