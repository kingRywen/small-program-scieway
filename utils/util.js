import config from './config.js'
const formatTime = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (type == 1) {
    return [year, month, day].map(formatNumber).join('-')
  }
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = (time) => {
  if (!time) {
    return new Date(null)
  }
  time = time.replace(/-/g, ':').replace(' ', ':')
  time = time.split(':')
  return new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5])
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const debounce = (time, fn) => {
  let timer;
  return function () {
    const ctx = this,
      args = arguments;
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(ctx, args)
    }, time)
  }
}

const domSelect = (id, cl) => {
  let query = wx.createSelectorQuery()
  query.selectAll(id).boundingClientRect()
  query.exec(function (res) {
    cl(res)
  })
}

const request = (method, url, props, cb, headers) => {
  wx.request({
    url: config.host + url,
    method: method,
    data: props,
    header: Object.assign({
      'content-type': 'application/json'
    }, headers),
    success: res => {
      cb(res)
    },
    fail: err => {
      console.log(JSON.stringify(err))
    }
  })
}


module.exports = {
  formatTime: formatTime,
  debounce: debounce,
  domSelect: domSelect,
  request: request,
  formatDate
}