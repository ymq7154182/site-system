import request from '@/utils/request'

// 查询人员打卡列表
export function scheduleList(data) {
  return request({
    url: '/scheduleManage/time-node/schedule-list',
    method: 'get',
    params: data
  })
}

export function scheduleGantt(id) {
  return request({
    url: `/scheduleManage/time-node/gantt?siteId=${id}`,
    method: 'get'
  })
}

export function scheduleInfo(data) {
  return request({
    url: `/scheduleManage/time-node/home-gantt`,
    method: 'get',
    params: data
  })
}

export function totalDay(id) {
  return request({
    url: `/scheduleManage/time-node/schedule-time-limit?siteId=${id}`,
    method: 'get'
  })
}

export function addNode(data) {
  return request({
    url: `/scheduleManage/time-node`,
    method: 'post',
    data: data
  })
}

export function getTaksNum(id) {
  return request({
    url: `/schedule/task/task-count?siteId=${id}`,
    method: 'get'
  })
}

export function getNodeNum(id) {
  return request({
    url: `/scheduleManage/node/node-count?siteId=${id}`,
    method: 'get'
  })
}

export function getDelayNum(id) {
  return request({
    url: `/scheduleManage/delay/delay-count?siteId=${id}`,
    method: 'get'
  })
}




