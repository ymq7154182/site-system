import request from '@/utils/request'

// 获取环境指标数据
export function getGreenInfo(data) {
  return request({
    url: '/green/screen/getGreenInfo',
    method: 'get',
    params: data
  })
}
// 获取阈值
export function getThreshold(data) {
  return request({
    url: '/green/screen/getThreshold',
    method: 'get',
    params: data
  })
}

export function getTypeCount(id) {
  return request({
    url: `/green/screen/getTypeCount?siteId=${id}`,
    method: 'get'
  })
}

export function getRealTimeWeather(id) {
  return request({
    url: `/green/screen/getRealTimeWeather?deptId=${id}`,
    method: 'get'
  })
}

export function consumption(data) {
  return request({
    url: `/green/consumption`,
    method: 'post',
    data: data
  })
}

export function getWeatherOnThe7th(id) {
  return request({
    url: `/green/screen/getWeatherOnThe7th?deptId=${id}`,
    method: 'get'
  })
}


export function collect(id) {
  return request({
    url: `/green/consumption/list?siteId=${id}`,
    method: 'get'
  })
}

