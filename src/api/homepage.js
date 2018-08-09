import fetch from '@/utils/fetch'

// 贷款详情
export function fetchLoanStatictis() {
  return fetch({
    url: '/supplyfinance/statictis/loanStatictis',
    method: 'get'
  })
}

// 融资申请
export function fetchCreditApply() {
  return fetch({
    url: '/supplyfinance/statictis/creditApply',
    method: 'get'
  })
}

// 已授信企业
export function fetchCreditCompany() {
  return fetch({
    url: '/supplyfinance/statictis/creditCompany',
    method: 'get'
  })
}

// 贷出资金
export function fetchLoanMoney() {
  return fetch({
    url: '/supplyfinance/statictis/loanMoney',
    method: 'get'
  })
}
