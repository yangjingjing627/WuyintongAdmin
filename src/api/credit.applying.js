import fetch from '@/utils/fetch'

export function fetchApplyING(query) {
  return fetch({
    url: '/fianceApply/creditApplyING',
    method: 'get',
    params: query
  })
}

export function fetchApplyRecord(query) {
  return fetch({
    url: '/fianceApply/creditApplyReply',
    method: 'get',
    params: query
  })
}
