<template>
  <div class="app-container">
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
  </div>
</template>

<script>
  import { fetchDetail } from '@/api/credit'

  export default {
    name: 'credit.detail',
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
          sort: '+id'
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
      // handleFilter() {
      //   this.listQuery.page = 1
      //   this.fetchData()
      // },
      // handleClick(row) {
      //   console.log(row)
      //   this.$router.push({ path: '/financing/creditDetail' })
      // },
      // handleCredit(row) {
      //   this.creditApproval.visible = true
      // },
      // handleApprovalRecord(row) {
      //   this.approvalRecord.visible = true
      // },
      // handleSizeChange(val) {
      //   // console.log(`每页 ${val} 条`);
      // },
      // handleCurrentChange(val) {
      //   // console.log(`当前页: ${val}`);
      // },
      // updateVisible(flag) {
      //   this.creditApproval.visible = flag
      // },
      // recordVisible(flag) {
      //   this.approvalRecord.visible = flag
      // },
      //  原有页面方法
      fetchData() {
        this.listLoading = true
        // console.log('appyNo-----' + this.applyNo)
        fetchDetail(this.listQuery).then(response => {
          console.log(response)
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }

</script>
<style scoped>
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 120px;
  }
</style>
