import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/loanbills',
    method: 'get',
    params: query
  })
}

export function certification(drawbookNo) {
  return fetch({
    url: '/loanbills/' + drawbookNo + '/certification',
    method: 'get'
  })
}

export function updateStatus(drawbookNo) {
  return fetch({
    url: '/loanbills/' + drawbookNo,
    method: 'put'
  })
}

