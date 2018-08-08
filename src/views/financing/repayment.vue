<template>
  <div class="app-container">
    <el-row>
      <el-col :span="28">
        <el-tabs type="card">
          <!--  <el-tab-pane label="正在审批">-->
          <el-row :gutter="20" class="margin-bottom10">
            <el-col :span="7">
              <div class="demo-input-suffix">
                账单编号：
                <el-input placeholder="" v-model="listQuery.repayNo"></el-input>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="demo-input-suffix">
                企业名称：
                <el-input width='100' placeholder="请输入内容" class="input-with-select" v-model="listQuery.custName"></el-input>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="demo-input-suffix">
                状态：
                <el-select v-model="listQuery.creditStatus" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button type="primary">重置</el-button>
          </el-row>
          <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange"
                    ref="multipleTable" width="100%">
            <!--  <el-table-column type="selection" align="center"></el-table-column>-->
            <el-table-column align="center" label='序号' width="50">
              <template scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='账单编号' min-width="280px">
              <template scope="scope">
                {{scope.row.repayNo}}
              </template>
            </el-table-column>
            <el-table-column label="企业名称" min-width="220px">
              <template scope="scope">
                {{scope.row.custName}}
              </template>
            </el-table-column>
            <el-table-column label="生成日期"  align="center" min-width="210px">
              <template scope="scope">
                {{scope.row.generDt}}
              </template>
            </el-table-column>
            <el-table-column label="提款笔数"  align="center" >
              <template scope="scope">
                {{scope.row.billlNum}}
              </template>
            </el-table-column>
            <el-table-column label="账单金额（元）"  align="center" min-width="90px">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.applyDt}}
              </template>
            </el-table-column>
            <el-table-column label="还款日期"  align="center" min-width="180px">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.repayDt}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="状态" width="100">
              <template scope="scope">
                <span>{{scope.row.repayStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看授信详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页  -->
          <div class="block margin-top10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.page"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>

        </el-tabs>
      </el-col>
    </el-row>
    <!--   <credit-approval :creditApproval="creditApproval" v-on:updateVisible="updateVisible"></credit-approval>
       <approval-record :approvalRecord="approvalRecord" v-on:recordVisible="recordVisible"></approval-record>-->
  </div>
</template>


<script>
  import { fetchList } from '@/api/repayment'
  export default {
    name: 'credit',
    data() {
      return {
        list: null,
        listLoading: true,
        total: null,
        listQuery: {
          page: 1,
          limit: 10,
          repayNo: undefined,
          custName: undefined,
          creditStatus: undefined
        },
        multipleSelection: [],
        downloadLoading: false,
        currentPage: 1,
        options: [{
          value: '全部',
          label: '全部'
        }, {
          value: '授信启用',
          label: '授信启用'
        }, {
          value: '授信到期',
          label: '授信到期'
        }],
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
        this.$router.push({ path: '/financing/repaymentBillDetail' })
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
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.pageCount
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
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 120px;
  }
</style>
