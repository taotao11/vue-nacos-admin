import request from '@/utils/request'

export function login(data) {
  const data1 = {
    username: 'admin',
    password: '123456',
    grant_type: 'password',
    scope: 'all',
    client_id: 'client',
    client_secret: 'server'
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    data:data1
  })
}

export function getInfo(token) {

  return request({
    url: '/user/sys-user/userInfo',
    method: 'get'
  })
}
export function getUserList(data) {

  return request({
    url: '/user/sys-user/list',
    method: 'post',
    data: data
  })
}
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
export function add(data) {
  return request({
    url: '/user/sys-user/add',
    method: 'post',
    data
  })
}