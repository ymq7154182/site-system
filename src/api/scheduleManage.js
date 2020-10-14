import request from '@/utils/request'

export function uploadImage(params) { // 上传图片
  return request({
    url: 'schedule/putImage',
    method: 'get',
    params: params
  })
}
export function getDeferReasons() { // 获取滞缓原因
  return request({
    url: 'schedule/getReasonDict',
    method: 'get'
  })
}
export function submitDeferInfo(params) { // 提交延缓信息
  return request({
    url: 'schedule/setDelaysReason',
    method: 'post',
    params: params,
    dataType: 'json',
    data: JSON.stringify(params),
    // transformRequest: [function () {
    //   return JSON.stringify(params)
    // }],
    headers: {
      'content-Type': 'application/json;',
    }
  })
}
export function getOneSchedules(params) { // 查找工地所有一级进度
  return request({
    url: 'schedule/getOneSche',
    method: 'get',
    params: params
  })
}
export function getTwoSchedules(params) { // 查找工地所有二级进度
  return request({
    url: 'schedule/getTwoSche',
    method: 'get',
    params: params
  })
}
export function updateTimeByPlanId(params) { // 更新每一个大进度的时间
  return request({
    url: 'schedule/updateTimeByPlanId',
    method: 'post',
    params: params
  })
}
export function finishSmallSchedule(params) { // 完成每一个大进度下的小进度
  return request({
    url: 'schedule/setScheduleFinish',
    method: 'post',
    params: params
  })
}
export function getImageList(params) { // 上传图片处获取所有图片
  return request({
    url: 'schedule/getSysProData',
    method: 'get',
    params: params
  })
}
export function getDeferInfo(params) { // 展示延期信息
  return request({
    url: 'schedule/getDelaysReason',
    method: 'post',
    params: params
  })
}
export function getErrorInfo(params) { // 显示
  return request({
    url: 'system/safe/getCheckInfoBySchedule',
    method: 'get',
    params: params
  })
}
