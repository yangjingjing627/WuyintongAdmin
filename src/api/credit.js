import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/fianceApply/creditApplyList?sum=10&page=1',
    method: 'get',
    params: query
  })
}

export function fetchDetail(query) {
  return fetch({
    url: '/article/detail',
    method: 'get',
    params: query
  })
}

export function fetchPv(pv) {
  return fetch({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

