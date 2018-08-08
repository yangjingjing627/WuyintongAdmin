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
    url: '/repayment/queryBillDetail?repayNo=20180502143536-695-151-6776',
    method: 'get',
    params: query
  })
}
