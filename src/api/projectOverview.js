import request from '@/utils/request'

// 根据类比获取安全管理或质量管理图表
export function getSafeOrQualityChartData (parems) {
  return request({
    url: '/system/safe/getOverview',
    method: 'get',
    params: parems
  })
}

// 根据工地id获取工地名称
export function getGongDiNameById (parems) {
  return request({
    url: '/getSite',
    method: 'get',
    params: parems
  })
}

// 大屏端输入项目名称
export function screenName (parems) {
  return request({
    url: '/system/safe/screenName',
    method: 'post',
    params: parems
  })
}

// 获取项目情况
export function getProjectDetails (parems) {
  return request({
    url: '/schedule/getSysProData',
    method: 'get',
    params: parems
  })
}
