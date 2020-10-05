import request from '@/utils/request'

export function test() {
  return request({
    url: 'system/safe/getSafetyRecord',
    method: 'get'
  })
}
