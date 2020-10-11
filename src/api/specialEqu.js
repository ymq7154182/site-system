import request from '@/utils/request'

// 查询工地人员信息列表
export function retrieveMember(data) {
  return request({
    url: '/people/user/list',
    method: 'get',
    params: data
  })
}

// 修改工地人员信息
export function updateMember(data) {
  return request({
    url: '/people/user',
    method: 'put',
    data
  })
}
