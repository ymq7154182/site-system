import request from '@/utils/request'

// 获取安全检查记录信息
export function getSafetyRecord (parems) {
  return request({
    url: '/system/safe/getSafetyRecord',
    method: 'get',
    params: parems
  })
}
// 重大危险源信息
export function getDanger (parems) {
  return request({
    url: '/system/safe/getDanger',
    method: 'get',
    params: parems
  })
}
// 整改信息
export function getRectification (parems) {
  return request({
    url: '/system/safe/getRectification',
    method: 'get',
    params: parems
  })
}
// 获取大屏安全检查各个阶段的数目信息  :未处理，2：正在处理，3：已经完成，4：预警
export function getSafetyCheck (parems) {
  return request({
    url: '/system/safe/getSafetyCheck',
    method: 'get',
    params: parems
  })
}
// 问题趋势
export function getProblem (parems) {
  return request({
    url: '/system/safe/getProblem',
    method: 'get',
    params: parems
  })
}
// 获取安全隐患各个类型的数目
export function getSafetyTrouble (parems) {
  return request({
    url: '/system/safe/getSafetyTrouble',
    method: 'get',
    params: parems
  })
}
// 新增月评子项信息
export function addCheckMonthChild (parems) {
  return request({
    url: '/system/safe/addCheckMonthChild',
    method: 'post',
    params: parems
  })
}
// 新增月评信息
export function addMonthCheck (parems) {
  return request({
    url: '/system/safe/addMonthCheck',
    method: 'post',
    params: parems
  })
}
// 得到所有月评信息
export function getAllCheckMonth (parems) {
  return request({
    url: '/system/safe/getAllCheckMonth',
    method: 'get',
    params: parems
  })
}
//
// 根据项目ID获取月评信息
export function getCheckMonthData (parems) {
  return request({
    url: '/system/safe/getCheckMonthData',
    method: 'get',
    params: parems
  })
}

// 根据项目ID获取月评信息
export function getSafeAdminInfo (parems) {
  return request({
    url: '/system/safe/getSafeAdminInfo',
    method: 'get',
    params: parems
  })
}
