import {
  request
} from '../../../utils/util.js'

let lists = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confName: '',
    articleLists: [],
    loading: true,
    indexNum: null,
    actionSheet: {
      items: [
        ['全部文章', '已注册文章', '未注册文章'],
        ['按注册时间排序', '按ID排序', '按标题排序']
      ],
      hidden: true,
      chooseNum: 0,
      numOne: 0,
      numTwo: 0
    },
    currentID: '00'
  },

  sure: function (e) {

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
   * actionsheet
   */
  showSheet: function (e) {
    console.log(e)
    this.setData({
      "actionSheet.hidden": false,
      "actionSheet.chooseNum": e.currentTarget.dataset.num
    })
  },

  actionSheetChange: function () {
    this.setData({
      "actionSheet.hidden": true,
    })
  },



  selectList: function (e) {
    let id = e.currentTarget.dataset.id
    this.chooseById(id)
  },

  // 通过序号来判断出哪一种筛选和排序
  chooseById: function (id) {

    let arr, reverse = false

    console.log(id);

    // 设置选择后的文字显示 0表示筛选文章  1表示排序
    if (id.charAt(0) == '0') {
      this.setData({
        "actionSheet.numOne": id.charAt(1)
      })
    } else {
      if (id.charAt(1) == this.data.actionSheet.numTwo) {
        reverse = true
      }
      this.setData({
        "actionSheet.numTwo": id.charAt(1)
      })
    }

    this.chooseArticle(this.data.actionSheet.numOne)
    arr = this.sortFun(this.data.actionSheet.numTwo, reverse)
    this.setData({
      articleLists: arr,
      currentID: id
    })

    this.actionSheetChange()
  },

  /**
   * 筛选文章并排序
   * id 文章筛选规则判断
   * sortNum 文章排序规则判断
   */
  chooseArticle: function (id) {
    switch (Number(id)) {
      case 0:
        this.getArticle('all')
        break;
      case 1:
        this.getArticle('has')
        break;
      case 2:
        this.getArticle('not')
        break;

      default:
        break;
    }


  },

  /**
   * 排序
   */
  sortFun: function (sortNum, reverse) {
    let current = lists.current
    if (reverse) {
      return current.reverse()
    }
    switch (Number(sortNum)) {
      case 0:
        current = current.sort((a, b) => (new Date(a.date).valueOf() - new Date(b.date).valueOf()))
        break;
      case 1:
        current = current.sort((a, b) => (a.id - b.id))
        break;
      case 2:
        current = current.sort((a, b) => (a.title.charAt(0).localeCompare(b.title.charAt(0))))
        break;

      default:
        break;
    }
    console.log(current);
    return current
  },

  // 按类型筛选文章
  getArticle: function (prop) {
    let current

    if (lists[prop]) {
      current = lists[prop]
    } else {
      switch (prop) {
        case 'all':
          current = lists.all
          break;
        case 'has':
          current = lists.all.filter((el) => el.date)
          break;
        case 'not':
          current = lists.all.filter((el) => !el.date)
          break;
        default:
          break;
      }

    }
    lists.current = lists[prop] = current

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
      let list = res.data.articleLists
      let arr
      if (res.data && res.data.status == 200) {
        if (!lists.all) {
          lists.current = list
          arr = this.sortFun(0)
          lists.all = lists.current = arr
        }
        this.setData({
          articleLists: arr,
          loading: false
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