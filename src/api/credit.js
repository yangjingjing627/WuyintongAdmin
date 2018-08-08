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
    url: '/fianceApply/creditApplyDetail/20180502143536-695-151-6776',
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

