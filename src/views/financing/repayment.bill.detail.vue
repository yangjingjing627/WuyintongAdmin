<template>
  <div class="app-container">
    <el-row :gutter="20" class="margin-bottom10">
      <el-col :span="7">
        <div class="demo-input-suffix">
          <el-form>
          <el-form-item label="账单金额合计">
            <el-input v-model="listQuery.billSum"></el-input>
          </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="demo-input-suffix">
          <el-form-item label="利息合计">
            <el-input v-model="listQuery.interestSum"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="demo-input-suffix">
          <el-form-item label="贷款笔数合计">
            <el-input v-model="listQuery.billlNum"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="demo-input-suffix">
          <el-form-item label="区块高度">
            <el-input v-model="listQuery.chainHeight"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <!--<el-row>-->
      <!--<el-col :span="28">-->
        <!--<el-tabs type="card">-->
          <!--&lt;!&ndash;  <el-tab-pane label="账单明细">&ndash;&gt;-->

          <!--&lt;!&ndash;  </el-tab-pane>&ndash;&gt;-->
          <!--<el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange"-->
                    <!--ref="multipleTable" width="100%">-->
            <!--&lt;!&ndash;  <el-table-column type="selection" align="center"></el-table-column>&ndash;&gt;-->
            <!--<el-table-column align="center" label='序号' width="50">-->
              <!--<template scope="scope">-->
                <!--{{scope.$index + 1}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label='提款书编号' min-width="280px">-->
              <!--<template scope="scope">-->
                <!--{{scope.row.drawbookNo}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="申请提款时间" min-width="200px">-->
              <!--<template scope="scope">-->
                <!--{{scope.row.applyTm}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="申请提款金额（元）"  align="center" min-width="170px">-->
              <!--<i class="el-icon-time"></i>-->
              <!--<template scope="scope">-->
                <!--{{scope.row.applyAmt}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="放款时间"  align="center" min-width="210px">-->
              <!--<template scope="scope">-->
                <!--{{scope.row.loanTm}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="放款金额（元）"  align="center" min-width="150px">-->
              <!--<i class="el-icon-time"></i>-->
              <!--<template scope="scope">-->
                <!--{{scope.row.loanAmt}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="利息（元）"  align="center" min-width="150px">-->
              <!--<i class="el-icon-time"></i>-->
              <!--<template scope="scope">-->
                <!--{{scope.row.interest}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="利率（%）"  align="center" min-width="150px">-->
              <!--<i class="el-icon-time"></i>-->
              <!--<template scope="scope">-->
                <!--{{scope.row.loanRate}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="还款金额（元）"  align="center" min-width="150px">-->
              <!--<i class="el-icon-time"></i>-->
              <!--<template scope="scope">-->
                <!--{{scope.row.repayAmt}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="还款日期"  align="center" min-width="180px">-->
              <!--<i class="el-icon-time"></i>-->
              <!--<template scope="scope">-->
                <!--{{scope.row.repayDt}}-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</el-tabs>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--   <credit-approval :creditApproval="creditApproval" v-on:updateVisible="updateVisible"></credit-approval>
       <approval-record :approvalRecord="approvalRecord" v-on:recordVisible="recordVisible"></approval-record>-->
  </div>
</template>


<script>
  import { fetchBillDetail } from '@/api/repayment'
  export default {
    name: 'repayment.bill.detail',
    data() {
      return {
        list: null,
        listLoading: true,
        total: null,
        listQuery: {
          chainHeight: undefined,
          TXID: undefined,
          billSum: undefined,
          billlNum: undefined,
          interestSum: undefined
        },
        multipleSelection: [],
        downloadLoading: false,
        currentPage: 1,
        value: ''
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
      handleFilter() {
        this.listQuery.page = 1
        this.fetchData()
      },
      handleClick(row) {
        console.log(row)
        this.$router.push({ path: '/financing/creditDetail' })
      },
      handleCredit(row) {
        this.creditApproval.visible = true
      },
      handleApprovalRecord(row) {
        this.approvalRecord.visible = true
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      updateVisible(flag) {
        this.creditApproval.visible = flag
      },
      recordVisible(flag) {
        this.approvalRecord.visible = flag
      },
      //  原有页面方法
      fetchData() {
        this.listLoading = true
        fetchBillDetail('repayNo:20180502143536-695-151-6776').then(response => {
          this.list = response.data.data.billDetailList
          this.listQuery.billlNum = response.data.data.billlNum
          this.listQuery.billSum = response.data.data.billSum
          this.listQuery.interestSum = response.data.data.interestSum
          this.listQuery.TXID = response.data.data.TXID
          this.listQuery.chainHeight = response.data.data.chainHeight
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>

<style scoped>

</style>
