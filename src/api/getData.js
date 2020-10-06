import request from '@/utils/request'

export function test() {
  return request({
    url: 'system/safe/getSafetyRecord',
    method: 'get'
  })
}

export function zijian(data) {
  return request({
    url: 'newAj/device/queryDevInstallationList',
    method: 'get',
    params: data
  })
}

