const URI = 'https://www.m.ipooy.com'
const fetch = require('./fetch')

function fetchApi(type, params) {
  return fetch(URI, type, params)
}

/**
 * 根据经纬度获取城市
 * @param  {Number} latitude   经度
 * @param  {Number} longitude  纬度
 * @return {Promise}       包含抓取任务的Promise
 */
function getData(type, params ) {
  return fetchApi(type, params)
    .then(res => res.data)
}

module.exports = { getData }
