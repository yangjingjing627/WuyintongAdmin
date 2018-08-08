import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/repayment/queryRepaymentList',
    method: 'get',
    params: query
  })
}

export function fetchBillDetail(query) {
  return fetch({
    url: '/repayment/queryBillDetail',
    method: 'get',
    params: query
  })
}

export function fetchRepaymentDetail(query) {
  return fetch({
    url: '/repayment/queryRepaymentDetail',
    method: 'get',
    params: query
  })
}
