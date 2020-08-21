import request from '@/utils/request'
import data from '@/views/pdf/content'

export function getMenus(data) {
  return request({
    url: '/user/sys-menu/page',
    method: 'post',
    data: data
  })
}
export function add(data) {
  return request({
    url: '/user/sys-menu/add',
    method: 'post',
    data: data
  })
}
export function update(data) {
  return request({
    url: '/user/sys-menu/update',
    method: 'post',
    data: data
  })
}

export function delById(query) {
  return request({
    url: '/user/sys-menu/delById',
    method: 'get',
    params: query
  })
}

export function getRoutMenus(data) {
  return request({
    url: '/user/sys-menu/getMenus',
    method: 'get',
    data: data
  })
}
