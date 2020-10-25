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
export function zijian(data) {
  return request({
    url: 'device/craneDevice/getDevInstallRecord?proId=' + data,
    method: 'get'
  })
}

// 新增安装自检新增表
export function addZijian(data) {
  return request({
    url: 'device/craneDevice/insertDevInstallRecord',
    method: 'post',
    params: data
  })
}

// 获取安装验收新增表
export function yanshou(data) {
  return request({
    url: 'device/craneDevice/getInstalAcceptRecord?proId=' + data,
    method: 'get'
  })
}

// 新增安装验收新增表
export function addyanshou(data) {
  return request({
    url: 'device/craneDevice/insertInstallAcceptRecord',
    method: 'post',
    params: data
  })
}

// 获取维护维养列表
export function weihu(data) {
  return request({
    url: 'device/maintenance/list?proid=' + data,
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
export function dingqi(data) {
  return request({
    url: 'device/check/list?proid='+data,
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

// 获取顶升加节新增列表
export function dingsheng(data) {
  return request({
    url: 'device/jackingPlusRecord/list?proid='+data,
    method: 'get',
  })
}

// 新增顶升加节列表
export function adddingsheng(data) {
  return request({
    url: 'device/jackingPlusRecord',
    method: 'post',
    data
  })
}

// 获取附着新增列表
export function fuzhuo(data) {
  return request({
    url: 'device/attachRecord/list?proid=' +data,
    method: 'get'
  })
}

// 新增附着列表
export function addfuzhuo(data) {
  return request({
    url: 'device/attachRecord',
    method: 'post',
    data
  })
}

// 查询塔式起重机运行记录( 省安监字段 )列表
export function tadiao(data) {
  return request({
    url: 'device/deviceTowerCrane/list',
    method: 'get',
    params: data
  })
}

// 新增塔式起重机运行记录( 省安监字段 )
export function addtadiao(data) {
  return request({
    url: 'device/deviceTowerCrane',
    method: 'post',
    data
  })
}

// 导出塔式起重机
export function exporttadiao(data) {
  return request({
    url: 'device/deviceTowerCrane/export',
    method: 'get',
    params: data
  })
}

// 查询施工升降机运行记录( 省安监字段 )列表
export function shengjiang(data) {
  return request({
    url: 'device/deviceRealTimeData/list',
    method: 'get',
    params: data
  })
}

// 导出升降机
export function exportshengjiang(data) {
  return request({
    url: 'device/deviceRealTimeData/export',
    method: 'get',
    params: data
  })
}

//
export function inJackingPlusRecordCheck(data) {
  return request({
    url: 'device/jackingPlusRecordCheck/inJackingPlusRecordCheck',
    method: 'post',
    data
  })
}

export function absyncAttachRecordCheckData(data) {
  return request({
    url: 'device/attachRecordCheck/absyncAttachRecordCheckData',
    method: 'post',
    data
  })
}

// 获取设备检查字典下拉树列表
export function devTreeSelect(data) {
  return request({
    url: 'check/devDict/devTreeSelect',
    method: 'get',
    params: data
  })
}
