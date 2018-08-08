<template>
  <div class="homepage">
    <div class="top-container">
      <div class="left-area">
        <p class="text">链上信息源服务提供商</p>
        <p class="count">29</p>
        <p class="text">全部服务提供商</p>
      </div>
      <div class="right-area">
        <p class="text">为我提供服务最频繁的服务商</p>
      </div>
    </div>
    <div class="total-container">
      <div class="total-item blue">
        <i class="iconfont icon-rongziguanli"></i>
        <b>1029</b>
        <p>当前融资申请数量</p>
      </div>
      <div class="total-item red">
        <i class="iconfont icon-qiye"></i>
        <b>1029</b>
        <p>已授信企业</p>
      </div>
      <div class="total-item purple">
        <i class="iconfont icon-msnui-calculator"></i>
        <b>1029<span>万</span></b>
        <p>贷出资金</p>
      </div>
    </div>
    <div class="echarts-container">
      <div class="left-area echarts-item">
        <h3>贷款详情</h3>
      </div>
      <div class="right-area echarts-item">
        <h3>融资详情</h3>
        <line-chart :width="'90%'" :height="'250px'"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import lineChart from './lineChart'
import * as hpApi from '@/api/homepage'
export default {
  name: 'homepage',
  components: {
    lineChart
  },
  mounted() {
    this.loanStatictis()
  },
  methods: {
    loanStatictis() {
      hpApi.fetchCreditCompany().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$iconImgUrl:'../../../src/assets';
@import '../../styles/iconfont.css';
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
      width: 518px;
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
      flex: 2;
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
    }
  }
}
</style>
