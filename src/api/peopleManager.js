import request from '@/utils/request'

// 查询人员打卡列表
export function list(data) {
  return request({
    url: '/people/manage/list',
    method: 'get',
    params: data
  })
}
// 导出人员打卡列表
export function getById(data) {
  return request({
    url: '/people/manage/export',
    method: 'get',
    params: data
  })
}
// 查询人员打卡列表
export function manage(data) {
  return request({
    url: '/people/manage',
    method: 'put',
    params: data,
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      'content-Type': 'application/json;',
    }
  })
}

export function listDay(data) {
  return request({
    url: '/attendance/people/listDay',
    method: 'get',
    params: data
  })
}

export function getCount(data) {
  return request({
    url: '/attendance/people/getCount',
    method: 'get',
    params: data
  })
}

export function treeselect() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}

export function getLeftColumn(data) {
  return request({
    url: '/system/initial/getLeftColumn',
    method: 'get',
    params: data
  })
}

export function peopleInfo(data) {
  return request({
    url: '/people/info/list',
    method: 'get',
    params: data
  })
}







// xxxxxxxxx
export function listDev(query) {
  return request({
    url: '/device/otherDev/list',
    method: 'get',
    params: query
  })
}

// 查询绿色施工设备+考勤设备详细
export function getDev(id) {
  return request({
    url: '/device/otherDev/' + id,
    method: 'get'
  })
}

// 新增绿色施工设备+考勤设备
export function addDev(data) {
  return request({
    url: '/device/otherDev',
    method: 'post',
    data: data
  })
}

// 修改绿色施工设备+考勤设备
export function updateDev(data) {
  return request({
    url: '/device/otherDev',
    method: 'put',
    data: data
  })
}

// 删除绿色施工设备+考勤设备
export function delDev(id) {
  return request({
    url: '/device/otherDev/' + id,
    method: 'delete'
  })
}

// 导出绿色施工设备+考勤设备
export function exportDev(query) {
  return request({
    url: '/device/otherDev/export',
    method: 'get',
    params: query
  })
}

// 获取部门列表
export function getDeparament(query) {
  return request({
    url: '/system/initial/getDeptList',
    method: 'get',
    params: query
  })
}


