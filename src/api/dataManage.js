import request from '@/utils/request'

export function findDoc(data) {
  return request({
    url: '/doc/list',
    method: 'get',
    params: data
  })
}

export function insertDoc(data) {
  return request({
    url: '/doc/insertDoc',
    method: 'post',
    params: data,
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      'content-Type': 'application/json;',
    }
  })
}

export function changeDoc(data) {
  return request({
    url: '/doc/changeDocInfo',
    method: 'put',
    data
  })
}

export function docType(data) {
  return request({
    url: '/docTypeDict/list',
    method: 'get',
    params: data
  })
}

export function getSite(data) {
  return request({
    url: '/getSite',
    method: 'get',
    params: data
  })
}

export function toPdfFile(data) {
  return request({
    url: '/doc/toPdfFile',
    method: 'get',
    params: data
  })
}


