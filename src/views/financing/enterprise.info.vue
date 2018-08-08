<template lang="html">
  <div class="mb10">
    <p class='title'>企业基本信息</p>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">企业全称</el-col>
          <el-col :span="12" style="text-align: left;">XX银行嘉定支行</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">企业全称</el-col>
          <el-col :span="12" style="text-align: left;">XX银行嘉定支行</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class='info-detail'>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">企业全称</el-col>
          <el-col :span="12" style="text-align: left;">XX银行嘉定支行</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12" style="text-align: right;">企业全称</el-col>
          <el-col :span="12" style="text-align: left;">XX银行嘉定支行</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
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
