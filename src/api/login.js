import fetch from '@/utils/fetch'

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function loginByUsername(form) {
  const data = {
    organizationId: form.organizationId,
    name: form.name,
    passwd: form.passwd
  }
  console.log(data)
  return fetch({
    url: '/user/login',
    method: 'get',
    params: data
  })
}
