import { asyncRoutes, constantRoutes } from '@/router'
import { getRoutMenus } from '@/api/menu'
import Layout from '@/layout/index'


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  
  routes.forEach(route => {
    const tmp = { ...route }
    // if (hasPermission(roles, tmp)) {
    //   if (tmp.children) {
    //     tmp.children = filterAsyncRoutes(tmp.children, roles)
    //   }
    //   res.push(tmp)
    // }
    if (tmp.component) {
      if (tmp.component === 'Layout') { // Layout组件特殊处理
        tmp.component = Layout
      } else {
        // accessedRouters[index].component = () => import(`@/${accessedRouters[index].component}`)
        const retStr = `@/${tmp.component}`
        const url = tmp.component
        console.log(retStr)
        // tmp.component = () => import('@/views/user/menu')
        tmp.component = resolve => require([`@/views/${url}`], resolve)
        // accessedRouters[index].component = loadView(accessedRouters[index].component)
      }
    }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, roles)
      
    }else{
      tmp.children = []
    }
    res.push(tmp)
  })
  console.log(res)
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   // accessedRoutes = asyncRoutes || []
      //   accessedRoutes =  []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
      console.log('in generateRoutes')
      getRoutMenus().then(response => {
        const { data } = response
        console.log('in getMenus')
        console.log(data.length)
        const asyncRouter = filterAsyncRoutes(Array.from(data),'')
        commit('SET_ROUTES', asyncRouter)
        resolve(asyncRouter)
      }).catch(error => {
        // reject(error)
      })
    })
  }
}
export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  // const accessedRouters = routers.forEach(router => {
  //   if (router.component) {
  //     if (router.component === 'Layout') { // Layout组件特殊处理
  //       router.component = Layout
  //     } else {
  //       // router.component = () => import(`@/${router.component}`)
  //       router.component = () => import('@/views/user/role')
  //     }
  //   }
  //   if (router.children && router.children.length) {
  //     router.children = filterAsyncRouter(router.children)
  //   }
  // })
  debugger
  let accessedRouters = []
  for (let index = 0; index < routers.length; index++) {
    accessedRouters[index] = routers[index];
    if (accessedRouters[index].component) {
      if (accessedRouters[index].component === 'Layout') { // Layout组件特殊处理
        accessedRouters[index].component = Layout
      } else {
        // accessedRouters[index].component = () => import(`@/${accessedRouters[index].component}`)
        accessedRouters[index].component = () => import('@/' + accessedRouters[index].component)
        // accessedRouters[index].component = loadView(accessedRouters[index].component)
      }
    }
    if (accessedRouters[index].children && accessedRouters[index].children.length) {
      accessedRouters[index].children = filterAsyncRouter(accessedRouters[index].children)
    }
  }

  // routers.forEach((value, index, array) => {
  //   accessedRouters[index] = value
  //   if (value.component) {
  //     if (router.component === 'Layout') { // Layout组件特殊处理
  //       accessedRouters[index].component = Layout
  //     } else {
  //       // router.component = () => import(`@/${router.component}`)
  //       accessedRouters[index].component = () => import('@/views/user/role')
  //     }
  //   }
  //   if (router.children && router.children.length) {
  //     router.children = filterAsyncRouter(router.children)
  //   }
  // });
  console.log('in filterAsyncRouter')
  console.log(accessedRouters)
  return accessedRouters
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
