import request from '@/utils/request'

// 查询支持设备详细

export function getLeftTree(id) {
  return request({
    url: `/schedule/task/board-tree?siteId=${id}`,
    method: 'get'
  })
}

// 任务方法
export function taskList(data) {
  return request({
    url: `/schedule/task/list`,
    method: 'get',
    params: data
  })
}

export function addTask(data) {
  return request({
    url: `/schedule/task`,
    method: 'post',
    data: data
  })
}



// 节点方法
export function nodeList(data) {
  return request({
    url: `/scheduleManage/node/list`,
    method: 'get',
    params: data
  })
}

export function nodeTemplate(data) {
  return request({
    url: `/scheduleManage/template/list`,
    method: 'get',
    params: data
  })
}


export function getTeamTree(id) {
  return request({
    url: `/people/teams/tree?siteId=${id}`,
    method: 'get'
  })
}

export function broadsideInfo(id) {
  return request({
    url: `/scheduleManage/node/tree?taskId=${id}`,
    method: 'get'
  })
}

export function addNodeTemplate(data) {
  return request({
    url: `/scheduleManage/template`,
    method: 'post',
    data: data
  })
}

export function addNode(params, data) {
  return request({
    url: `/scheduleManage/node`,
    method: 'post',
    params: params,
    data: data
  })
}

export function putNode(params, data) {
  return request({
    url: `/scheduleManage/node`,
    method: 'put',
    params: params,
    data: data
  })
}

export function delNode(id) {
  return request({
    url: `/scheduleManage/node/${id}`,
    method: 'delete'
  })
}

export function getBanzuPeople(data) {
  return request({
    url: `/people/teams/nameFromTeam`,
    method: 'get',
    params: data
  })
}

export function exportNodeTemplate(data) {
  return request({
    url: `/scheduleManage/template/export`,
    method: 'get',
    params: data
  })
}

export function exportNodeList(data) {
  return request({
    url: `/scheduleManage/node/export`,
    method: 'get',
    params: data
  })
}

export function importNodeList(data) {
  return request({
    url: `/scheduleManage/node/exportNode`,
    method: 'post',
    params: data
  })
}

export function delayList(id) {
  return request({
    url: `/scheduleManage/delay/${id}`,
    method: 'get'
  })
}

export function addDelay(data) {
  return request({
    url: `/scheduleManage/delay`,
    method: 'post',
    data: data
  })
}

export function updateDelay(data) {
  return request({
    url: `/scheduleManage/delay`,
    method: 'put',
    data: data
  })
}

export function delDelay(id) {
  return request({
    url: `/scheduleManage/delay/${id}`,
    method: 'delete'
  })
}

export function importNode(id, parentId, file) {
  return request({
    url: `/scheduleManage/node/importData?taskId=${id}&parentId=${parentId}`,
    method: 'post',
    data: file
  })
}

export function getProjectInfo(data) {
  return request({
    url: `/schedule/task/back-total`,
    method: 'get',
    params: data
  })
}

export function getInfo(id) {
  return request({
    url: `/schedule/task/${id}`,
    method: 'get'
  })
}
export function putTask(data) {
  return request({
    url: `/schedule/task`,
    method: 'put',
    data: data
  })
}

export function delTask(id) {
  return request({
    url: `/schedule/task/${id}`,
    method: 'delete'
  })
}

export function listSingleProjectTree(query) {
  return request({
    url: '/singleProject/pretreeselect',
    method: 'get',
    params: query
  })
}

export function showTask(query) {
  return request({
    url: '/schedule/task/task-list',
    method: 'get',
    params: query
  })
}

export function showNode(query) {
  return request({
    url: '/scheduleManage/node/node-list',
    method: 'get',
    params: query
  })
}

export function showDelay(query) {
  return request({
    url: '/scheduleManage/delay/delay-list',
    method: 'get',
    params: query
  })
}



