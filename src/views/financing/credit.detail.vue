<template>
  <!--<div class="app-container">
    <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="标题">
        <el-input v-model="temp.title"></el-input>
      </el-form-item>

      <el-form-item label="重要性">
        <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
      </el-form-item>

      <el-form-item label="点评">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
        </el-input>
      </el-form-item>
    </el-form>
  </div>-->

  <div class="mb10">
    <p class='title'>授信详情</p>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">企业名称</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.custName}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">产品全称</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.proName}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">授信金额（元）</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.creditLine}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">授信利率</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.creditRate}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">授信起始日</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.startDt}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">授信截止日</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.endDt}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">授信状态</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.creditStatus}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">授信批复日期</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.replyTrialTime}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">备注</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.remark}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">区块高度</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.chainHeight}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">TX ID</el-col>
          <el-col :span="12" style="text-align: left;">{{temp.TXID}}</el-col>
        </el-row>
      </el-col>

    </el-row>
  </div>

</template>

<script>
  import { fetchDetail } from '@/api/credit'

  export default {
    name: 'creditDetail',
    data() {
      return {
        temp: {
          proName: undefined,
          custName: undefined,
          creditLine: undefined,
          creditRate: undefined,
          startDt: undefined,
          endDt: undefined,
          creditStatus: undefined,
          remark: undefined,
          chainHeight: undefined,
          TXID: undefined,
          replyTrialTime: undefined,
          repayNo: undefined
        }
      }
    },
    created() {
      this.fetchData()
    },
    /* components: {
       CreditApproval,
       ApprovalRecord
     },*/
    methods: {
      //  原有页面方法
      fetchData() {
        this.listLoading = true
        // console.log('appyNo-----' + this.applyNo)
        this.temp.repayNo = '20180502143536-695-151-6776'
        fetchDetail(this.temp).then(response => {
          console.log('detail-------' + response)
          this.temp = response.data.data
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }

</script>

<style lang="scss">
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 120px;
  }
  .title {
    background: #333953;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #B4BAC6;
    letter-spacing: 0;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    margin: 0;
  }
  .info-detail {
    height: 34px;
    line-height: 34px;
    background: #272D4A;
    border-bottom: 1px solid black;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #B4BAC6;
  }
  .mb10 {
    margin-bottom: 10px;
  }
</style>
