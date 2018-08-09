import fetch from '@/utils/fetch'

export function loginByUsername(query) {
  // const data = {
  //   organizationId,
  //   name,
  //   passwd
  // }
  return fetch({
    url: '/user/login',
    method: 'get',
    params: query
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

// export function getUserInfo(token) {
//   return fetch({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
