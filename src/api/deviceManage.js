import request from '@/utils/request'

// 根据工地id获取整条记录
export function getSysProData(data) {
  return request({
    url: 'getSysProData',
    method: 'get',
    params: data
  })
}
//获取安装自检表
export function zijian() {
  return request({
    url: 'device/getDevInstallRecord',
    method: 'get'
  })
}

// 新增安装自检新增表
export function addZijian(data) {
  return request({
    url: 'device/insertDevInstallRecord',
    method: 'post',
    params: data
  })
}

// 获取安装验收新增表
export function yanshou() {
  return request({
    url: 'device/getInstalAcceptRecord',
    method: 'get'
  })
}

// 新增安装验收新增表
export function addyanshou(data) {
  return request({
    url: 'device/insertInstallAcceptRecord',
    method: 'post',
    params: data
  })
}

// 获取维护维养列表
export function weihu() {
  return request({
    url: 'device/maintenance/list',
    method: 'get'
  })
}

// 新增维护维养列表
export function addweihu(data) {
  return request({
    url: 'device/maintenance',
    method: 'post',
    data
  })
}

// 获取定期检查列表
export function dingqi() {
  return request({
    url: 'device/check/list',
    method: 'get'
  })
}

// 新增定期检查列表
export function adddingqi(data) {
  return request({
    url: 'device/check',
    method: 'post',
    data
  })
}
