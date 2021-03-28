import request from '@/utils/request'

export function addFolder(data) {
    return request({
        url: "/document/video/folder",
        method: 'post',
        data:data
    })
}

export function listFolder(proId) {
    return request({
      url: `/document/video/folder/listFolder?proId=${proId}`,
      method: 'get'
    })
}

export function getFolderInfo(siteId, id) {
    return request({
      url: `/doc/video/listFolderContent?siteId=${siteId}&urlId=${id}`,
      method: 'get'
    })
}

export function insertDoc(data) {
    return request({
      url: '/doc/video/insertDoc',
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
      url: '/doc/video/changeDocInfo',
      method: 'put',
      data
    })
}

export function getFolderContent(data) {
    return request({
      url: "/doc/video/getFolderContent",
      method: 'get',
      params:data
    })
}

export function delFile(id) {
    return request({
      url: `/doc/video/deleteDocManagement?fileId=${id}`,
      method: 'delete'
    })
}
