import request from '@/utils/request'

// 获取环境指标数据
export function getGreenInfo(data) {
  return request({
    url: '/green/screen/getGreenInfo',
    method: 'get',
    params: data
  })
}
// 获取阈值
export function getThreshold(data) {
  return request({
    url: '/green/screen/getThreshold',
    method: 'get',
    params: data
  })
}
