import request from '@/utils/request'

export function getRoutes(data) {
  return request({
    url: '/user/sys-rule/selectByPage',
    method: 'post',
    data: data
  })
}

export function getRoles(query) {
  return request({
    url: '/user/sys-rule/info',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  return request({
    url: '/user/sys-rule/add',
    method: 'post',
    data: data
  })
}

export function updateRole( data) {
  return request({
    url: `/user/sys-rule/update`,
    method: 'post',
    data: data
  })
}

export function deleteRole(id) {
  return request({
    url: `/user/sys-rule/delById`,
    method: 'get'
  })
}

