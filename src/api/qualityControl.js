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
export function addMonthCheck(data) {
  return request({
    url: '/system/safe/addMonthCheck',
    method: 'post',
    params: data,
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      'content-Type': 'application/json;',
    }
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
// 根据时间范围锁定数据
export function getCheckRecordByTime (parems) {
  return request({
    url: '/system/safe/getCheckRecordByTime',
    method: 'get',
    params: parems
  })
}
// 根据工地id获取整条记录
export function getSysProData (parems) {
  return request({
    url: '/getSysProData',
    method: 'get',
    params: parems
  })
}
// 大屏端输入项目名称
export function screenName (parems) {
  return request({
    url: '/system/safe/screenName',
    method: 'post',
    params: parems
  })
}

export function getCheckInfoBySchedule(data) {
  return request({
    url: '/system/safe/getCheckInfoBySchedule',
    method: 'get',
    params: data
  })
}

export function getTree() {
  return request({
    url: '/check/dict/treeselect',
    method: 'get'
  })
}

export function getTreedict(data) {
  return request({
    url: '/check/dict/getInfo?dicCode=' + data,
    method: 'get',
  })
}

export function getInfoByWarnType(data) {
  return request({
    url: 'device/deviceCheck/list',
    method: 'get',
    params: data
  })
}

export function educationList(data) {
  return request({
    url: '/SafetyAndQuality/education/list',
    method: 'get',
    params: data
  })
}

export function addEducation(data) {
  return request({
    url: '/SafetyAndQuality/education',
    method: 'post',
    data: data
  })
}