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
