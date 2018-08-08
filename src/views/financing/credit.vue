<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3">
        <!-- 步骤条 -->
        <el-steps direction="vertical" :space="100" :active="3" finish-status="success">
          <el-step title="融资申请"></el-step>
          <el-step title="授信初审"></el-step>
          <el-step title="授信复审"></el-step>
          <el-step title="授信启用"></el-step>
          <el-step title="授信到期"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="21">
        <el-tabs type="card">
        <!--  <el-tab-pane label="正在审批">-->
            <el-row :gutter="20" class="margin-bottom10">
              <el-col :span="7">
                <div class="demo-input-suffix">
                  融资申请编号：
                  <el-input placeholder="" v-model="listQuery.supplyNo"></el-input>
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
                      ref="multipleTable">
            <!--  <el-table-column type="selection" align="center"></el-table-column>-->
              <el-table-column align="center" label='序号' width="50">
                <template scope="scope">
                  {{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='融资申请编号' min-width="280px">
                <template scope="scope">
                  {{scope.row.applyNo}}
                </template>
              </el-table-column>
              <el-table-column label="企业名称">
                <template scope="scope">
                  {{scope.row.custName}}
                </template>
              </el-table-column>
              <el-table-column label="产品名称"  align="center" min-width="230px">
                <template scope="scope">
                   {{scope.row.prodName}}
                </template>
              </el-table-column>
              <el-table-column label="授信金额（元）" width="115" align="center">
                <i class="el-icon-time"></i>
                <template scope="scope">
                  {{scope.row.creditLine}}
                </template>
              </el-table-column>
              <el-table-column label="授信起始日"  align="center" min-width="180px">
                <i class="el-icon-time"></i>
                <template scope="scope">
                  {{scope.row.startDt}}
                </template>
              </el-table-column>
              <el-table-column label="授信截止日"  align="center" min-width="180px">
                <i class="el-icon-time"></i>
                <template scope="scope">
                  {{scope.row.endDt}}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="备注" width="100">
                <template scope="scope">
                  <span>{{scope.row.pageviews}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="状态" width="100">
                <template scope="scope">
                  <span>{{scope.row.creditStatus}}</span>
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

        <!--  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>-->

      <!--    </el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
 <!--   <credit-approval :creditApproval="creditApproval" v-on:updateVisible="updateVisible"></credit-approval>
    <approval-record :approvalRecord="approvalRecord" v-on:recordVisible="recordVisible"></approval-record>-->
  </div>
</template>


<script>
  import { fetchList } from '@/api/credit'
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
          supplyNo: undefined,
          custName: undefined,
          creditStatus: undefined,
          sort: '+id'
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
