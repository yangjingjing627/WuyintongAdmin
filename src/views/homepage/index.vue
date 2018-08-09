<template>
  <div class="homepage" v-cloak>
    <div class="top-container">
      <div class="left-area">
        <!-- <p class="text">链上信息源服务提供商</p>
        <p class="count">29</p>
        <p class="text">全部服务提供商</p> -->
      </div>
      <div class="right-area">
        <p class="text">为我提供服务最频繁的服务商</p>
      </div>
    </div>
    <div class="total-container">
      <div class="total-item blue">
        <i class="iconfont icon-rongziguanli"></i>
        <b>{{applyTotal}}</b>
        <p>当前融资申请数量</p>
      </div>
      <div class="total-item red">
        <i class="iconfont icon-qiye"></i>
        <b>{{companyTotal}}</b>
        <p>已授信企业</p>
      </div>
      <div class="total-item purple">
        <i class="iconfont icon-msnui-calculator"></i>
        <b>{{loanTotal}}<span>万</span></b>
        <p>贷出资金</p>
      </div>
    </div>
    <div class="echarts-container">
      <div class="left-area echarts-item">
        <h3>贷款详情</h3>
        <pie-chart :statictis="statictis"></pie-chart>
      </div>
      <div class="right-area echarts-item">
        <h3>融资申请</h3>
        <line-chart :width="'90%'" :height="'250px'" :lastMonth="lastMonth" :thisMonth="thisMonth"></line-chart>
        <div class="opts">
          <div class="red point">上月</div>
          <div class="blue point">本月</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lineChart from './lineChart'
import pieChart from './pieChart'
import * as hpApi from '@/api/homepage'
export default {
  name: 'homepage',
  components: {
    lineChart,
    pieChart
  },
  data() {
    return {
      lastMonth: [],
      thisMonth: [],
      applyTotal: '',
      companyTotal: '',
      loanTotal: '',
      statictis: []
    }
  },
  mounted() {
    this.creditApply()
    this.creditCompany()
    this.loanMoney()
    this.loanStatictis()
  },
  methods: {
    // 融资申请
    creditApply() {
      hpApi.fetchCreditApply().then(res => {
        res = res.data
        if (res.data) {
          const data = res.data
          this.lastMonth = data.lastMonth
          this.thisMonth = data.thisMonth
          this.applyTotal = data.total
        }
      })
    },
    // 已授信企业
    creditCompany() {
      hpApi.fetchCreditCompany().then(res => {
        res = res.data
        this.companyTotal = res.data
      })
    },
    // 贷出资金
    loanMoney() {
      hpApi.fetchLoanMoney().then(res => {
        res = res.data
        this.loanTotal = res.data
      })
    },
    loanStatictis() {
      hpApi.fetchLoanStatictis().then(res => {
        res = res.data
        this.statictis = res.data
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$iconImgUrl:'../../../src/assets';
@import '../../styles/iconfont.css';
[v-cloak]{
  display: none;
}
.homepage{
  max-width: 1440px;
  padding: 20px 30px;
  margin: 0 auto;
  p{
    margin: 0
  }
  .top-container{
    display: flex;
    .left-area{
      background: url(#{$iconImgUrl}/homepage/top_left_bg.png) 0 0 no-repeat;
      flex: 1;
      max-width: 518px;
      height: 140px;
      margin-right: 10px;
      padding-left: 99px;
      padding-top: 21px; 
      .count{
        font-size: 48px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 50px;
        margin-top: 3px;
      }
    }
    .right-area{
      background: url(#{$iconImgUrl}/homepage/top_right_bg.png) right 0 no-repeat;
      height: 140px;
      flex: 1;
      padding-left: 31px;
      padding-top: 21px;
    }
    .text{
      font-size: 14px;
      color: #B4BAC6;
      line-height: 26px;
    }
  }
  .total-container{
    display: flex;
    margin-top: 20px;
    .total-item{
      flex: 1;
      height: 200px;
      border-radius: 2px;
      padding: 20px 0 0 33px;
      &.blue{
        background-image: linear-gradient(-133deg, #1D99CE 0%, #37D3C1 100%);
      }
      &.red{
        background-image: linear-gradient(-132deg, #FE7098 0%, #FF875C 100%);
        margin: 0 20px;
      }
      &.purple{
        background-image: linear-gradient(-132deg, #4280CB 0%, #8C70E4 100%);
      }
      i{
        font-size: 26px;
        display: block;
      }
      b{
        display: block;
        margin-top: 35px;
        font-size: 64px;
        line-height: 1;
        font-weight: normal;
        letter-spacing: 0;
        margin-left: -5px;
        span{
          font-size: 20px;
        }
      }
      p{
        margin-top: 10px;
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
  .echarts-container{
    display: flex;
    margin-top: 20px;
    .echarts-item{
      height: 318px;
      background: #1C2241;
      border-radius: 2px;
      h3{
        margin: 0;
        padding: 18px 19px;
        font-size: 14px;
        line-height: 26px;
        color: #B4BAC6;
      }
    }
    .left-area{
      width: 510px;
      background:  url(#{$iconImgUrl}/homepage/small_bg.png) 22px 40px no-repeat #1C2241;
      margin-right: 20px;
    }
    .right-area{
      flex: 1;
      position: relative;
      .opts{
        position: absolute;
        right: 20px;
        top: 200px;
        .point{
          font-size: 14px;
          color: #B4BAC6;
          &:before{
            content: ' ';
            display: inline-block;
            width: 9px;
            height: 9px;
            border-radius:50%;
            margin-right: 5px;
          }
          &.red:before{
            background-color: #ED6293;
          }
          &.blue:before{
            background-color: #53A8E2;
          }
        }
      }
    }
  }
}
</style>
